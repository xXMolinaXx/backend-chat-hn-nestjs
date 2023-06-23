import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { userLoginInterface } from 'src/common/interfaces/answer.interface';
import { ProductsService } from 'src/products/services/products.service';
import { createUserDTO, updateUserDTO } from '../dtos/users.dto';
import { users } from '../entities/users.entity';

// (interacion entre modulos)IMPORTANT
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private productsService: ProductsService /*(interacion entre modulos)IMPORTANT*/,
    @InjectModel(users.name) private userModel: Model<users>,
  ) {}
  findOne(id) {
    return this.userModel.findById(id).exec();
  }
  findAll() {
    return this.userModel.find().exec();
  }
  async insertOne(newUser: createUserDTO): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(newUser.password, salt);
    const findUser = await this.userModel
      .findOne({ userName: newUser.userName })
      .exec();
    if (!findUser) {
      const user = new this.userModel({ ...newUser, password: hash });
      return await user.save();
    }
    return;
  }
  async updateOne(id: string, user: updateUserDTO): Promise<any> {
    const answer = await this.userModel.updateOne(
      { _id: id },
      { $set: { ...user } },
    );
    return answer;
  }
  async login(
    userLogin: userLoginInterface,
  ): Promise<Record<string, never> | users> {
    try {
      const { userName, password } = userLogin;
      const userLogged = await this.userModel.findOne({ userName: userName });
      if (userLogged) {
        const isMatch = await bcrypt.compare(password, userLogged?.password);
        if (!isMatch) return {};
        return userLogged;
      } else {
        return {};
      }
    } catch (error: any) {
      this.logger.error(error.toString());
    }
  }
  async deleteOne(id): Promise<any> {
    const answer = await this.userModel.findOneAndDelete({ _id: id });
    return answer;
  }
  getOrderByUser(id: number) {
    const user = this.findOne(id);
    const purchase = this.productsService.findAll();
    const purchaseUser = { user, purchase };
    return purchaseUser; // (interacion entre modulos)IMPORTANT
  }
  async updateAddFriend(idUser, idFriend): Promise<any> {
    return await this.userModel.updateOne(
      { _id: idUser },
      { $push: { friends: idFriend } },
    );
  }
}

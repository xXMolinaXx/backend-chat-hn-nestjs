import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
  answerPeticionsInterface,
  userLoginInterface,
} from 'src/common/interfaces/answer.interface';
import { ProductsService } from 'src/products/services/products.service';
import { createUserDTO, updateUserDTO } from '../dtos/users.dto';
import { users } from '../entities/users.entity';
import { response } from 'express';

// (interacion entre modulos)IMPORTANT
@Injectable()
export class UserService {
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
    const findUser = await this.userModel
      .findOne({ userName: newUser.userName })
      .exec();
    if (!findUser) {
      const user = new this.userModel(newUser);
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
    const { userName, password } = userLogin;
    const userLogged = await this.userModel.findOne({ userName: userName });
    if (userLogged?.password !== password) return {};
    return userLogged;
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
}

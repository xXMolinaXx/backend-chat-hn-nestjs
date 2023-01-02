import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  answerPeticionsInterface,
  userLoginInterface,
} from 'src/common/interfaces/answer.interface';
import { ProductsService } from 'src/products/services/products.service';
import { users } from '../entities/users.entity';
import { UsersModule } from '../users.module';
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
  async insertOne(newUser) {
    const user = new this.userModel(newUser);
    return await user.save();
  }
  async login(
    userLogin: userLoginInterface,
  ): Promise<Record<string, never> | users> {
    const { userName, password } = userLogin;
    const userLogged = await this.userModel.findOne({ userName: userName });
    if (userLogged?.password !== password) return {};
    return userLogged;
  }
  // deleteOne(id) {
  //   this.users = this.users.filter((el) => el.id !== id);
  //   return true;
  // }
  getOrderByUser(id: number) {
    const user = this.findOne(id);
    const purchase = this.productsService.findAll();
    const purchaseUser = { user, purchase };
    return purchaseUser; // (interacion entre modulos)IMPORTANT
  }
}

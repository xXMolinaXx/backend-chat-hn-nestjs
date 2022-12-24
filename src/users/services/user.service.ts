import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
import { UserEntity } from '../entities/users.entity';
// (interacion entre modulos)IMPORTANT
@Injectable()
export class UserService {
  private counter = 0;
  private users: UserEntity[] = [
    {
      id: 1,
      name: 'Kenny',
      description: 'Hi, whatsup',
      birthDate: new Date(),
      lastName: 'Molina',
      password: '1234',
    },
  ];
  constructor(
    private productsService: ProductsService /*(interacion entre modulos)IMPORTANT*/,
  ) {}
  findOne(id) {
    return this.users.find((el) => el.id === id);
  }
  findAll() {
    return this.users;
  }
  insertOne(newUser) {
    this.users.push(newUser);
    return true;
  }
  deleteOne(id) {
    this.users = this.users.filter((el) => el.id !== id);
    return true;
  }
  getOrderByUser(id: number) {
    const user = this.findOne(id);
    const purchase = this.productsService.findAll();
    const purchaseUser = { user, purchase };
    return purchaseUser; // (interacion entre modulos)IMPORTANT
  }
}

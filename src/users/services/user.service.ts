import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/services/products.service';
// (interacion entre modulos)IMPORTANT
@Injectable()
export class UserService {
  USERS = [];
  constructor(private productsService: ProductsService) {}
  findOne(id) {}
  getOrderBuUser(id: number) {
    const user = this.findOne(id);
    return this.productsService.findAll();// (interacion entre modulos)IMPORTANT
  }
}

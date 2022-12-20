import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  private counter = 0;
  private products: Product[] = [
    {
      id: 1,
      name: 'products 2',
      description: 'asdasd asdsad',
      price: 1,
      stock: 1,
    },
  ];
  findAll() {
    return this.products;
  }
  findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) throw new NotFoundException('error para buscar'); // IMPORTANT
    return product;
  }
  create(payload: any) {
    this.counter = this.counter + 1;
    const newProduct = {
      id: this.counter,
      ...payload,
    };
    return newProduct;
  }
}

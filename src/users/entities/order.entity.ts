import { Product } from '../../products/entities/products.entity';
export class Order {
  date: Date;
  user: string;
  products: Product[];
}

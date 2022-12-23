import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UserService } from './services/user.service';

@Module({
  imports: [ProductsModule], //(interacion entre modulos)IMPORTANT : this is the way to import the services to other module
  providers: [UserService],
})
export class UsersModule {}

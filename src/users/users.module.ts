import { Module } from '@nestjs/common';
import { ProductsModule } from 'src/products/products.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { OtherController } from './controllers/other.controller';

@Module({
  imports: [ProductsModule], //(interacion entre modulos)IMPORTANT : this is the way to import the services to other module
  providers: [UserService],
  controllers: [UserController, OtherController],
})
export class UsersModule {}

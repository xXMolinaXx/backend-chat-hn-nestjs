import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsModule } from 'src/products/products.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { OtherController } from './controllers/other.controller';
import { UserSchema, users } from './entities/users.entity';
@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: users.name,
        schema: UserSchema,
      },
    ]),
  ], //(interacion entre modulos)IMPORTANT : this is the way to import the services to other module
  providers: [UserService],
  controllers: [UserController, OtherController],
  exports: [UserService],
})
export class UsersModule {}

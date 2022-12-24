import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUsers() {
    return this.userService.findAll();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
  @Get('/purchase/:id')
  getUserPurchase(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrderByUser;
  }
  @Post()
  createUser(@Body() newUser: any) {
    this.userService.insertOne(newUser);
    return true;
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.userService.deleteOne(id);
    return true;
  }
}

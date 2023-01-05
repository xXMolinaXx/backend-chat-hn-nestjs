import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { BadRequestException, HttpException } from '@nestjs/common/exceptions';
import { ApiTags } from '@nestjs/swagger';
import {
  answerPeticionsInterface,
  userLoginInterface,
} from 'src/common/interfaces/answer.interface';
import { createUserDTO, updateUserDTO } from '../dtos/users.dto';
import { UserService } from '../services/user.service';
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  @HttpCode(200)
  getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Post()
  @HttpCode(202)
  async createUser(
    @Body() newUser: createUserDTO,
  ): Promise<answerPeticionsInterface> {
    const answer = await this.userService.insertOne(newUser);
    if (answer) {
      return { statusCode: 201, message: 'user created', data: answer };
    }
    throw new BadRequestException('El nombre de usaurio ya existe');
  }
  @Post('login')
  async login(
    @Body() user: userLoginInterface,
  ): Promise<answerPeticionsInterface> {
    const answer = await this.userService.login(user);
    if (!answer.userName)
      throw new HttpException(
        'usuario y contrasena incorrectos',
        HttpStatus.UNAUTHORIZED,
      );
    return {
      statusCode: 201,
      message: 'El usuario ingreso correctamente',
      data: answer,
    };
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() payload: updateUserDTO,
  ): Promise<answerPeticionsInterface> {
    try {
      const answer = await this.userService.updateOne(id, payload);
      return { statusCode: 200, message: 'usuario actualizado', data: answer };
    } catch (error) {
      throw new HttpException('datos Incorrectos', HttpStatus.UNAUTHORIZED);
    }
  }
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    try {
      const answer = await this.userService.deleteOne(id);
      return { statusCode: 200, message: 'usuario Eliminado', data: answer };
    } catch (error) {
      console.log(error.message);
      throw new HttpException('Hubo un error', HttpStatus.UNAUTHORIZED);
    }
  }
  // @Get()
  // @HttpCode(200)
  // getUsers() {
  //   return this.userService.findAll();
  // }
  // @Get('/purchase/:id')
  // getUserPurchase(@Param('id', ParseIntPipe) id: number) {
  //   return this.userService.getOrderByUser(id);
  // }
  // @Delete(':id')
  // deleteUser(@Param('id', ParseIntPipe) id: number) {
  //   this.userService.deleteOne(id);
  //   return true;
  // }
}

import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  getUsers() {
    return { user: 'kenny' };
  }
  @Get('query')
  getSomeUser(@Query() params: any, @Query('otro') otro: any) {
    console.log(otro);
    return params;
  }
  @Get(':id')
  getOneUser(@Param('id') id: number) {
    return id;
  }
}

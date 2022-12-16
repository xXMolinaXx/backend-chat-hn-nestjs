import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
/*
Nota: @Controller ya nos crea la ruta por defecto de products, los metodos get solo deben escribirse la ruta extra aparte de products
*/
@Controller('products')
export class ProductsController {
  @Get('nuevo')
  newEndPoint() {
    return 'soy nuevo';
  }
  @Post()
  set(@Body() params: any) {
    return params;
  }
  @Put(':id')
  update(@Param('id') id: any, @Body() payload: any) {
    return { id, payload };
  }
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id') id: any, @Body() payload: any) {
    return id;
  }
}

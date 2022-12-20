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
import { ProductsService } from '../service/products.service';
/*
Nota: @Controller ya nos crea la ruta por defecto de products, los metodos get solo deben escribirse la ruta extra aparte de products
*/
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {} //inyeccion de metodos
  @Get('all')
  newEndPoint() {
    return this.productsService.findAll();
  }
  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }
  @Post()
  set(@Body() params: any) {
    //return params;
    this.productsService.create(params);
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

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
  ParseIntPipe,
} from '@nestjs/common';
import { PipePipe } from '../../common/pipe/pipe.pipe';
import { ProductsService } from '../services/products.service';
import { CreateProductsDto } from '../dtos/products.dtos';
/*
Nota: @Controller ya nos crea la ruta por defecto de products, los metodos get solo deben escribirse la ruta extra aparte de products
*/
// IMPORTANT
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {} //inyeccion de metodos
  // @Get('all')
  // newEndPoint() {
  //   return this.productsService.findAll();
  // }
  // @Get(':id')
  // getProduct(@Param('id', ParseIntPipe) id: number) {
  //   //IMPORTANT
  //   return this.productsService.findOne(id);
  // }
  // @Get('2/:id')
  // getProduct2(@Param('id', PipePipe) id: number) {
  //   //IMPORTANT pipe
  //   return this.productsService.findOne(id);
  // }
  // @Post()
  // set(@Body() params: any) {
  //   //return params;
  //   this.productsService.create(params);
  // }
  // @Post('/post')
  // set2(@Body() params: CreateProductsDto) {
  //   //return params;
  //   this.productsService.create(params);
  // }
  // @Put(':id')
  // update(@Param('id') id: any, @Body() payload: any) {
  //   return { id, payload };
  // }
  // @Delete(':id')
  // @HttpCode(HttpStatus.OK)
  // delete(@Param('id') id: any, @Body() payload: any) {
  //   return id;
  // }
}

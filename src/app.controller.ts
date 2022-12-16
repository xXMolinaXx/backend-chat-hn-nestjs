import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hi ken';
  }
  @Get('nuevo')
  newEndPoint() {
    return 'soy nuevo';
  }
  // Two way of receiving params in routes
  @Get('products/:id')
  getPorducts(@Param() params: any) {
    return `products id ${params.id}`;
  }
  @Get('products2/:id')
  getPorducts2(@Param('id') id: any) {
    return `products id ${id}`;
  }
  // obtain two parameters
  @Get('products3/:id/:id2')
  getPorducts3(@Param('id') id: any, @Param('id2') id2: any) {
    return `products id ${id} y id2 ${id2}`;
  }
  
}

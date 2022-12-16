import { Controller, Get } from '@nestjs/common';
/*
Nota: @Controller ya nos crea la ruta por defecto de products, los metodos get solo deben escribirse la ruta extra aparte de products
*/
@Controller('products')
export class ProductsController {
  @Get('nuevo')
  newEndPoint() {
    return 'soy nuevo';
  }
}

import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard) //it can be added to the method, but this way it can protect al endpoints
@Controller()
export class AppController {
  // las rutas no dinamicas deben de colocarse primero
  constructor(private readonly appService: AppService) {}
  //@UseGuards(ApiKeyGuard)
  @Public() // personal decorator to set a endpoint public
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Public()
  @Get('/guard')
  getGuard(): string {
    return 'hello world';
  }
  @Get('data')
  getdata() {
    return this.appService.getUser();
  }
  // @Get('nuevo')
  // newEndPoint() {
  //   return 'soy nuevo';
  // }
  // // Two way of receiving params in routes
  // @Get('product/:id')
  // getPorducts(@Param() params: any) {
  //   return `products id ${params.id}`;
  // }
  // @Get('products2/:id')
  // getPorducts2(@Param('id') id: any) {
  //   return `products id ${id}`;
  // }
  // // obtain two parameters
  // @Get('products3/:id/:id2')
  // getPorducts3(@Param('id') id: any, @Param('id2') id2: any) {
  //   return `products id ${id} y id2 ${id2}`;
  // }
  // // parametros query
  // // products4 url example localhost:3000/products4?limit=1&offset=2
  // // se puede aplicar dividir los paramtros sin hacer la desctrucutarion
  // @Get('products4')
  // getPorducts4(@Query() params: any, @Query('otro') otro: any) {
  //   const { limit, offset } = params;
  //   return `limit => ${limit} y offset => ${offset} otro => ${otro}`;
  // }
}

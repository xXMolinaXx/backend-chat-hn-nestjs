import { Body, Controller, Post } from '@nestjs/common';

@Controller('blogs')
export class BlogsController {
  @Post('')
  createArticle(@Body() params) {
    try {
    } catch (error) {}
  }
}

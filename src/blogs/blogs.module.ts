import { Module } from '@nestjs/common';
import { BlogsController } from './controllers/blogs.controller';

@Module({
  controllers: [BlogsController]
})
export class BlogsModule {}

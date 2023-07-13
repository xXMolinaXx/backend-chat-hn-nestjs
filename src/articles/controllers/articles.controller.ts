import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ArticlesService } from '../services/articles.service';
import { articleDto } from '../dtos/articles.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { Public } from 'src/auth/decorators/public.decorator';
@UseGuards(ApiKeyGuard)
@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Public()
  @Post()
  async insert(@Body() data: articleDto) {
    return await this.articlesService.insert(data);
  }
}

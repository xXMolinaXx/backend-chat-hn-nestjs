import { Injectable, Logger } from '@nestjs/common';
import { Article } from '../schemas/article.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { answerEndPoint } from 'src/common/interfaces/answer.interface';
import { articleDto } from '../dtos/articles.dto';
import { UserService } from 'src/users/services/user.service';

@Injectable()
export class ArticlesService {
  private logger = new Logger(ArticlesService.name);
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>,
    private readonly userService: UserService,
  ) {}
  async insert(data: articleDto): Promise<answerEndPoint> {
    try {
      const user = await this.userService.findOne(data.userId);
      // if (!user) {
      //   return {
      //     message: 'este usuario no existe',
      //     success: false,
      //   };
      // }
      const article = new this.articleModel(data);
      await article.save();
      return {
        message: 'articulo agregado',
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `error insert ${error.toString()}`,
      };
    }
  }
  async delete(mongoId) {
    try {
      const user = await this.articleModel.deleteOne({ _id: mongoId });
      return {
        message: 'articulo eliminado',
        success: true,
      };
    } catch (error: any) {
      return {
        success: false,
        message: `error insert ${error.toString()}`,
      };
    }
  }
}

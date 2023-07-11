import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ExecSyncOptionsWithBufferEncoding } from 'child_process';
import { Document, HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;
@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  userId: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ required: true })
  body: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);

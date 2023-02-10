import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { MessageDataInterface } from 'src/common/interfaces/message.interface';

export type MessageDocument = HydratedDocument<Article>;
@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  message: MessageDataInterface[];
  @Prop({ type: [String], required: true })
  users: string[];
}

export const MessageSchema = SchemaFactory.createForClass(Article);

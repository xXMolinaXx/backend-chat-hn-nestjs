import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type MessageDocument = HydratedDocument<message>;
@Schema({ timestamps: true })
export class message extends Document {
  @Prop({ required: true })
  message: string;
  @Prop([String])
  users: string[];
}

export const MessageSchema = SchemaFactory.createForClass(message);

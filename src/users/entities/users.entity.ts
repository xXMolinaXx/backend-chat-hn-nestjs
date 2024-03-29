import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { type } from 'os';
@Schema({ timestamps: true })
export class users extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  lastName: string;
  @Prop()
  userName: string;
  @Prop({ required: true })
  description: string;
  @Prop({ type: Date })
  birthDate: Date;
  @Prop({ required: true })
  password: string;
  @Prop({ type: [String], default: [] })
  friends: string[];
  @Prop({ type: [String], default: [] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(users);

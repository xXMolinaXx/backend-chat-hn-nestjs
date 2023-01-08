import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  message,
  MessageSchema,
} from './entities/messages.entity';
import { MessagesService } from './services/messages.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}

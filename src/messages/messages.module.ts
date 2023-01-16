import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { message, MessageSchema } from './entities/messages.entity';
import { MessagesService } from './services/messages.service';
import { MessageController } from './controllers/message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: message.name, schema: MessageSchema }]),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
  controllers: [MessageController],
})
export class MessagesModule {}

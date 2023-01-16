import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { userMessage } from '../dtos/userMessage.dto';
import { MessagesService } from '../services/messages.service';
@ApiTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private messagesService: MessagesService) {}
  @Post()
  async readMessage(@Body() params: userMessage) {
    const message = await this.messagesService.readMessage(
      params.userId,
      params.otherUserId,
    );
    return message;
  }
}

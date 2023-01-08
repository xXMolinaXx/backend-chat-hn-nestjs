import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  message,
  MessageDocument,
} from '../entities/messages.entity/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(message.name) private messageModel: Model<MessageDocument>,
  ) {}
  async createMessage({ userSendingId, userReceivingId, message }) {
    const user = new this.messageModel({
      message,
      users: [userReceivingId, userSendingId],
    });
    return await user.save();
  }
  async readMessage(userId1, userId2) {
    const messages = await this.messageModel.find({
      users: { $all: [userId1, userId2] },
    });
    return messages;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageInterface } from 'src/common/interfaces/message.interface';
import { message, MessageDocument } from '../entities/messages.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(message.name) private messageModel: Model<MessageDocument>,
  ) {}
  async createMessage({
    userSendingId,
    userReceivingId,
    message,
  }: MessageInterface) {
    let messageAnswer: any;
    messageAnswer = await this.messageModel
      .findOne({
        users: { $all: [userReceivingId, userReceivingId] },
      })
      .exec();
    if (!messageAnswer) {
      messageAnswer = new this.messageModel({
        message: [message],
        users: [userReceivingId, userSendingId],
      });
      return await messageAnswer.save();
    } else {
      await this.messageModel
        .updateOne({ _id: messageAnswer._id }, { $push: { message: message } })
        .exec();
      return this.messageModel.findById(messageAnswer._id);
    }
  }
  async readMessage(userId1: string, userId2: string) {
    const messages = await this.messageModel.find({
      users: { $all: [userId1, userId2] },
    });
    return messages;
  }
  async deleteMessage(id: string): Promise<any> {
    return await this.messageModel.deleteOne({ _id: id });
  }
}

export interface MessageInterface {
  userSendingId: string;
  userReceivingId: string;
  message: MessageDataInterface;
}
export interface MessageDataInterface {
  sendAtd: Date;
  message: string;
  userId: string;
}

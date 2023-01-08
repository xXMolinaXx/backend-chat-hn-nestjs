import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages/services/messages.service';
import { UserService } from './users/services/user.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  socketOnline: any[] = [];
  constructor(
    private userService: UserService,
    private messageService: MessagesService,
  ) {}
  afterInit() {
    console.log('inicio del websocket');
  }
  async handleConnection(socket) {
    this.socketOnline.push({ idSocket: socket.id, ...socket.handshake.auth });
    //console.log('se conecto un usuario al websocket');
    this.server.emit('peopleConnected', {
      amountConnected: this.server.engine.clientsCount,
      dataUserConnected: this.socketOnline,
    });
  }
  handleDisconnect(socket) {
    this.socketOnline = this.socketOnline.filter(
      (el) => el.idSocket !== socket.id,
    );
    //console.log('se desconecto un usuario del websocket');
    this.server.emit('peopleConnected', {
      amountConnected: this.server.engine.clientsCount,
      dataUserConnected: this.socketOnline,
    });
  }
  @SubscribeMessage('chating')
  async updateReadMessage(@MessageBody() data: any) {
    const { userLogged, userTochat, message } = data;
    console.log(userLogged, userTochat);
    const messages = await this.messageService.createMessage({
      message,
      userReceivingId: userTochat._id,
      userSendingId: userLogged._id,
    });
    console.log(messages);
    this.server
      .to(userLogged.socketId)
      .emit('transfering messages', messages.message);
    this.server
      .to(userTochat.socketId)
      .emit('transfering messages', messages.message);
  }
  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(
  //     map((item) => ({ event: 'events', data: item })),
  //   );
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number) {
  //   return data;
  // }
}

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
    this.server.use((socket: any, next) => {
      const username = socket.handshake.auth.name;
      if (!username) {
        return next(new Error('invalid username'));
      }
      socket.username = username;
      next();
    });
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
    try {
      const { userLogged, userTochat, message } = data;
      const messages = await this.messageService.createMessage({
        message,
        userReceivingId: userTochat._id,
        userSendingId: userLogged._id,
      });
      this.server
        .to(userLogged.idSocket)
        .emit('transfering messages', messages);
      this.server
        .to(userTochat.idSocket)
        .emit('transfering messages', messages);
    } catch (error) {
      console.log('error', error);
    }
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

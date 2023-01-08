import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  handleConnection(socket) {
    this.socketOnline.push({ idSocket: socket.id, ...socket.handshake.auth });
    this.messageService.createMessage({
      userSendingId: '123',
      userReceivingId: '111',
      message: 'Hola guardando mensaje',
    });
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
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    return data;
  }
}

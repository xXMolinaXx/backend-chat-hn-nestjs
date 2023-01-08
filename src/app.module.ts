import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { firstValueFrom } from 'rxjs';
import { GlobalModule } from './global/global.module';
import { EventsGateway } from './events.gateway';
import { UserService } from './users/services/user.service';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    MessagesModule,
    UsersModule,
    HttpModule,
    GlobalModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [
    EventsGateway,
    AppService,
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos',
          {
            headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
          },
        );
        return (await firstValueFrom(tasks)).data;
      },
      inject: [HttpService],
    }, //useFactory
  ],
})
export class AppModule {}

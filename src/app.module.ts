import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { catchError, firstValueFrom } from 'rxjs';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    GlobalModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
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

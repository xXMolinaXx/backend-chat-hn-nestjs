import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { catchError, firstValueFrom } from 'rxjs';

const API_KEY = 'kenny'; /**useValue and useClass */
const API_KEY_PROD = '';
@Module({
  imports: [UsersModule, HttpModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'API_KEY', useValue: API_KEY } /*useValue and useClass */,
    {
      provide: 'TASK',
      useFactory: async (http: HttpService) => {
        /*const { data } = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos').pipe(
            catchError((error) => {
              throw 'An error happened!';
            }),
          ),
        );
        //const data = (await firstValueFrom(task));
        return data;*/
      },
      inject: [HttpService],
    }, //useFactory
  ],
})
export class AppModule {}

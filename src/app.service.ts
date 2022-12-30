import { Injectable, Inject /**useValue and useClass */ } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string /**useValue and useClass */,
    @Inject('TASK') private task: string /**useFactory */,
    @Inject('MONGO') private dataBase: Db,
  ) {}
  getHello(): string {
    console.log(this.task[0]); //useFactory
    return `Hello World! ${this.apiKey} --`; /**useValue and useClass */
  }
  async getUser() {
    const usersCollection = this.dataBase.collection('users');
    const users = await usersCollection.find().toArray();
    return users;
  }
}

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
    //return `Hello World! ${this.apiKey} -- \n escribe /docs despues de lo que ya hay en la barra de busqueda para entrar a la documentacions`; /**useValue and useClass */
    return `
    <div >
    <h1 style="text-align: center">Hola, Api chat<h1>
    <a style="text-align: center" href="docs" title="Die Homepage" rel="nofollow">Documentacion</a>
    </div>
    `;
  }
  async getUser() {
    const usersCollection = this.dataBase.collection('users');
    const users = await usersCollection.find().toArray();
    return users;
  }
}

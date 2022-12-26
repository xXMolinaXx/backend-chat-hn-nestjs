import { Injectable, Inject /**useValue and useClass */ } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string /**useValue and useClass */,
    @Inject('TASK') private task: string /**useFactory */,
  ) {}
  getHello(): string {
    console.log(this.task[0]); //useFactory
    return `Hello World! ${this.apiKey} --`; /**useValue and useClass */
  }
}

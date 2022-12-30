import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
const API_KEY = 'LOCALHOST:5000'; /**useValue and useClass  Global Module*/

@Global()
@Module({
  providers: [
    { provide: 'API_KEY', useValue: API_KEY } /*useValue and useClass */,
    {
      provide: 'MONGO',
      useFactory: async () => {
        const DATABASE_URL =
          'mongodb+srv://test:FPcwk29AVKedclvX@cluster0.iszp5h4.mongodb.net/chat_hn?retryWrites=true&w=majority';
        const cliente = new MongoClient(DATABASE_URL);
        await cliente.connect();
        const DATABASE = cliente.db('chat_hn');
        return DATABASE;
      },
    },
  ],
  exports: ['API_KEY', 'MONGO'], // Global Module
})
export class GlobalModule {}

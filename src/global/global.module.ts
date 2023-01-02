import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
const API_KEY = 'LOCALHOST:5000'; /**useValue and useClass  Global Module*/

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync(
      // 'mongodb+srv://test:FPcwk29AVKedclvX@cluster0.iszp5h4.mongodb.net/chat_hn?retryWrites=true&w=majority',
      // {
      //   dbName: 'chat_hn',
      // },
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => ({
          uri: config.get('DATA_BASE'),
        }),
      },
    ),
  ],
  providers: [
    { provide: 'API_KEY', useValue: API_KEY } /*useValue and useClass */,
    {
      provide: 'MONGO',
      useFactory: async (configuration: ConfigService) => {
        const DATABASE_URL = configuration.get('DATA_BASE');
        const cliente = new MongoClient(DATABASE_URL);
        await cliente.connect();
        const DATABASE = cliente.db('chat_hn');
        return DATABASE;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule], // Global Module
})
export class GlobalModule {}

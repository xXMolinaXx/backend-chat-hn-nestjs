import { Module, Global } from '@nestjs/common';

const API_KEY = 'LOCALHOST:5000'; /**useValue and useClass  Global Module*/
@Global()
@Module({
  providers: [
    { provide: 'API_KEY', useValue: API_KEY } /*useValue and useClass */,
  ],
  exports: ['API_KEY'],// Global Module
})
export class GlobalModule {}

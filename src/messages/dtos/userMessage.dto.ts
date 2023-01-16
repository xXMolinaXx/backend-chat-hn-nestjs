import { ApiProperty, PartialType } from '@nestjs/swagger';
export class userMessage {
  @ApiProperty({ description: 'id del usuario conectado' })
  userId: string;
  @ApiProperty({ description: 'id del usuario con el que se va a mensajear' })
  otherUserId: string;
}

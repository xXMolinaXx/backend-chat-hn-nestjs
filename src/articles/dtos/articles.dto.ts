import { ApiProperty } from '@nestjs/swagger';
export class articleDto {
  @ApiProperty({ description: 'id del usuario que creo el articulo' })
  userId: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty({ description: 'toda la informacion del articulo' })
  body: string;
}

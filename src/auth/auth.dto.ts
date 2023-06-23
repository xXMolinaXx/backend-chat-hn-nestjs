import { ApiProperty } from '@nestjs/swagger';
export class LogInDto {
  @ApiProperty({ description: 'Nombre de la persona', title: 'nombre' })
  username: string;
  @ApiProperty({ description: 'contrasena encriptada' })
  password: string;
}

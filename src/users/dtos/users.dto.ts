import { ApiProperty, PartialType } from '@nestjs/swagger';
export class createUserDTO {
  @ApiProperty({ description: 'Nombre de la persona', title: 'nombre' })
  name: string;
  @ApiProperty({ description: 'apellido de la persona' })
  lastName: string;
  @ApiProperty({ description: 'apodo de usuario' })
  userName: string;
  @ApiProperty({ description: 'descripcion breve' })
  description: string;
  @ApiProperty({ description: 'fecha de nacimiento' })
  birthDate: Date;
  @ApiProperty({ description: 'contrasena encriptada' })
  password: string;
}
export class updateUserDTO extends PartialType(createUserDTO) {}

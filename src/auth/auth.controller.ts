import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './auth.dto';
import { Role:rolesEnum } from "./../common/enums/roles.enum";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LogInDto) {
    return this.authService.signIn({
      password: signInDto.password,
      userName: signInDto.username,
    });
  }
  Roles(rolesEnum.Admin)
  @Get()
  roleEndPoint() {
    return 'Hola eres un admin';
  }
}

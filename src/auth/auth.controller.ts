import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LogInDto } from './auth.dto';
import { Role } from './../common/enums/roles.enum';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { ApiKeyGuard } from './guards/api-key.guard';
import { Public } from './decorators/public.decorator';

@UseGuards(ApiKeyGuard)
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LogInDto) {
    return this.authService.signIn({
      password: signInDto.password,
      userName: signInDto.username,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post()
  roleEndPoint(data: any): string {
    return 'Hola eres un admin';
  }
}

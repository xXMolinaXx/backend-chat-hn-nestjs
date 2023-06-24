import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { userLoginInterface } from 'src/common/interfaces/answer.interface';
import { UserService } from 'src/users/services/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(dataLogin: userLoginInterface): Promise<any> {
    const user = await this.usersService.login(dataLogin);
    if (!user) {
      throw new UnauthorizedException();
    }
    this.logger.debug(user);
    const payload = { sub: user._id, username: user.userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}

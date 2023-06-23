import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { userLoginInterface } from 'src/common/interfaces/answer.interface';
import { UserService } from 'src/users/services/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(private usersService: UserService) {}

  async signIn(dataLogin: userLoginInterface): Promise<any> {
    const user = await this.usersService.login(dataLogin);
    this.logger.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return user;
  }
}

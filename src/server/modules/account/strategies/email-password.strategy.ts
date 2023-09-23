import {
  ExecutionContext,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { Request } from 'express';
import { AccountService } from '../account.service';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

@Injectable()
export class EmailPasswordStrategy extends PassportStrategy(
  Strategy,
  'emailpassword',
) {
  constructor(private accountService: AccountService) {
    super({
      usernameField: 'userName',
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(@Req() req: Request): Promise<any> {
    const { userName, password, groupId } = req.body;
    const user = await this.accountService.findByEmail(groupId, userName);
    delay(5000);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!password || user.password !== password?.toString()) {
      throw new UnauthorizedException();
    }
    return { ...user, groupId: groupId };
  }
}

@Injectable()
export class EmailPasswordAuthGuard extends AuthGuard('emailpassword') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

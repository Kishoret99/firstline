import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { extactFromCookie } from 'src/server/utils';
import { AccountService } from '../account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  secret: string | null;
  constructor(
    private accountService: AccountService,
    private config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        extactFromCookie,
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const { userId, groupId } = payload;
    const { groups, ...user } = await this.accountService.findByUserId(userId);
    const group = await this.accountService.findGroupById(groupId);
    return {
      user,
      group,
    };
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

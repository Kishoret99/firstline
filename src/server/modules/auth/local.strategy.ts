import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// all users can access rows with some particular groupsids

const hospitals = {
  mahatmagandhinrt: {},
  anjireddynrt: {},
};

const users = {
  'saikishoret99@gmail.com': {
    email: 'saikishoret99@gmail.com',
    password: '12345678',
  },
};
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor() {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = users[username];
    delay(5000);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

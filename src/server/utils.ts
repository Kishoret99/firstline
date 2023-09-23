import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Cookie } from 'next-cookie';
import { Account } from './modules/account/entities/account.entity';

export type UserSession = Account & { groupId: string };

export const extactFromCookie = (request) => {
  const cookies = Cookie.fromApiRoute(request, request);
  let token = null;
  if (request && cookies) token = cookies.get['token'];
  return token;
};

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

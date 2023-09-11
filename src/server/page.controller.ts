import { IncomingMessage, ServerResponse } from 'http';
import { Controller, Get, Req, Res } from '@nestjs/common';
import { NextService } from './modules/next/next.service';

@Controller()
export class PageController {
  constructor(private readonly next: NextService) {}

  @Get()
  public async home(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    res.setHeader('Set-Cookie', 'isLoggedin=true');
    this.next.render('/index', { name: 'kishore3', color: 'yellow' }, req, res);
  }

  @Get('/login')
  public async login(@Req() req: IncomingMessage, @Res() res: ServerResponse) {
    this.next.render('/login', req, res);
  }
}

import { Controller, Get, Query, Req, Res } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AccountService } from '../account/account.service';
import { NextService } from '../next/next.service';

@Controller()
export class PageController {
  constructor(
    private readonly next: NextService,
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {}

  @Get()
  public async defaultPage(@Req() req: Request, @Res() res: Response) {
    this.next.render('/login', { _hospitalName: 'kishore2' }, req, res);
  }

  @Get('/login')
  public async loginPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('gid') groupId: string,
  ) {
    if (!groupId) {
      const defaultGroupId = this.configService.get('DEFAULT_GID');
      res.redirect(301, `/login?gid=${defaultGroupId}`);
    }
    const groupEntity = await this.accountService.findGroupById(groupId);
    this.next.render('/login', { _hospitalName: groupEntity.name }, req, res);
  }

  @Get('/register')
  public async registerPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('gid') groupId: string,
  ) {
    if (!groupId) {
      const defaultGroupId = this.configService.get('DEFAULT_GID');
      res.redirect(301, `/register?gid=${defaultGroupId}`);
    }
    this.next.render(
      '/login',
      { _hospitalName: 'kishore', color: 'yellow' },
      req,
      res,
    );
  }

  @Get('/layout')
  public async layoutPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('gid') groupId: string,
  ) {
    this.next.render('/layout', req, res);
  }

  @Get('/test')
  public async testPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('gid') groupId: string,
  ) {
    this.next.render('/index', req, res);
  }

  @Get('/demo')
  public async demoPage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('gid') groupId: string,
  ) {
    this.next.render('/demo', req, res);
  }
}

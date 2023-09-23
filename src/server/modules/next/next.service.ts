import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { IncomingMessage, ServerResponse } from 'http';
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class NextService {
  private server: NextServer;

  setNextServer(server: NextServer): void {
    this.server = server;
  }

  getNextServer(): NextServer {
    return this.server;
  }

  public async render(page: string, req: Request, res: Response): Promise<void>;

  public async render<T>(
    page: string,
    data: T,
    req: Request,
    res: Response,
  ): Promise<void>;

  public async render(
    page: string,
    arg2: any,
    arg3: any,
    arg4?: any,
  ): Promise<void> {
    if (this.isIncomingMessage(arg2)) {
      await this.server.render(arg2, arg3, page);
    } else {
      await this.server.render(arg3, arg4, page, arg2);
    }
  }

  private isIncomingMessage(arg: any): arg is Request {
    return typeof (arg as Request).httpVersion === 'string';
  }
}

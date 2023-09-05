import { IncomingMessage, ServerResponse } from 'http';
import { Injectable } from '@nestjs/common';
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

  public async render(
    page: string,
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<void>;

  public async render(
    page: string,
    data: any,
    req: IncomingMessage,
    res: ServerResponse,
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

  private isIncomingMessage(arg: any): arg is IncomingMessage {
    return typeof (arg as IncomingMessage).httpVersion === 'string';
  }
}

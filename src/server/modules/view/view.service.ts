import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import { Injectable, OnModuleInit } from '@nestjs/common'
const createServer = require('next')
import { NextServer } from 'next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = createServer({ dev: true, dir: './src/client' })
      const res = await this.server.prepare();
      console.log('nest server prepare res', res);
    } catch (error) {
      console.log(error)
    }
  }

  getNextServer(): NextServer {
    return this.server
  }

  // public async render(page: string, req: IncomingMessage, res: ServerResponse): Promise<void>

  // public async render(page: string, data: any, req: IncomingMessage, res: ServerResponse): Promise<void>

  // public async render(page: string, arg2: any, arg3: any, arg4?: any): Promise<void> {
  //   if (this.isIncomingMessage(arg2)) {
  //     await this.app.render(arg2, arg3, page);
  //   } else {
  //     await this.app.render(arg3, arg4, page, arg2);
  //   }
  // }

  // private isIncomingMessage(arg: any): arg is IncomingMessage {
  //   return typeof (arg as IncomingMessage).httpVersion === 'string';
  // }
}
import { Module } from '@nestjs/common';
const createServer = require('next')
import { Options } from 'next/dist/server/next-server';
import { NextService } from './next.service';

type NextServerConstructor = Omit<Options, 'staticMarkup'> & {
  dev?: boolean;
}

@Module({
  providers: [
    NextService,
  ],
  exports: [
    NextService,
  ],
})
export class NextModule {
  constructor(
    private readonly nextService: NextService,
  ) {}

  public async prepare(options?: NextServerConstructor) {
    const appServer = createServer(Object.assign({
      dev: true,
      dir: './src/client',
    }, options || {}));
    return appServer.prepare().then(() => this.nextService.setNextServer(appServer));
  }
}

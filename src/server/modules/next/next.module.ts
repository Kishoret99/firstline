import { Module } from '@nestjs/common';
import { Options } from 'next/dist/server/next-server';

import { NextService } from './next.service';

const createServer = require('next');

type NextServerConstructor = Omit<Options, 'staticMarkup'> & {
  dev?: boolean;
};

@Module({
  providers: [NextService],
  exports: [NextService],
})
export class NextModule {
  constructor(private readonly nextService: NextService) {}

  public async prepare(options?: NextServerConstructor) {
    const appServer = createServer(
      Object.assign(
        {
          dev: true,
          dir: './src/client',
        },
        options || {},
      ),
    );
    return appServer
      .prepare()
      .then(() => this.nextService.setNextServer(appServer));
  }
}

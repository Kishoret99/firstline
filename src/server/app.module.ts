import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DummyModule } from './modules/dummy/dummy.module';
import { AppService } from './app.service';
import { NextMiddleware } from './modules/next/next.middleware';
import { NextModule } from './modules/next/next.module';
import { PageController } from './page.controller';

@Module({
  imports: [DummyModule, NextModule],
  controllers: [PageController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(NextMiddleware).forRoutes({
      path: '_next*',
      method: RequestMethod.GET,
    });

    consumer.apply(NextMiddleware).forRoutes({
      path: 'static*',
      method: RequestMethod.GET,
    });
  }
}

import { Module } from '@nestjs/common';
import { ViewModule } from './modules/view/view.module';
import { DummyModule } from './modules/dummy/dummy.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DummyModule,
    ViewModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}

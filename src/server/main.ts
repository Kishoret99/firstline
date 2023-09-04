import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextModule } from './modules/next/next.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.get(NextModule).prepare().then(() => {
    app.listen(3000, '0.0.0.0', () => {
      console.log('> Ready on http://localhost:3000');
    });
  });
}
bootstrap();

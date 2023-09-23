import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { DummyModule } from './modules/dummy/dummy.module';
import { NextMiddleware } from './modules/next/next.middleware';
import { NextModule } from './modules/next/next.module';
import { PageController } from './modules/page/page.controller';
import { PageModule } from './modules/page/page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
      global: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const entitiesPath = [__dirname + '/**/**/*.entity{.js,.ts}'];
        return {
          autoLoadEntities: true,
          type: 'postgres',
          host: config.get('POSTGRES_HOST'),
          port: parseInt(config.get('POSTGRES_PORT', '5432'), 10),
          username: config.get('POSTGRES_USER'),
          password: config.get('POSTGRES_PASSWORD'),
          database: config.get('POSTGRES_DATABASE'),
          entities: entitiesPath,
          synchronize: true,
          migrationsTableName: 'migrations_typeorm',
          migrations: [__dirname + '/migrations/*{.ts,.js}'],
          extra: {
            connectionLimit: 15,
          },
        };
      },
      inject: [ConfigService],
    }),
    DummyModule,
    NextModule,
    AccountModule,
    PageModule,
  ],
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

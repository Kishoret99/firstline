import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Account } from './entities/account.entity';
import { Group } from './entities/group.entity';
import { EmailPasswordStrategy } from './strategies/email-password.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Group])],
  controllers: [AccountController],
  providers: [AccountService, EmailPasswordStrategy, JwtStrategy],
  exports: [AccountService],
})
export class AccountModule {}

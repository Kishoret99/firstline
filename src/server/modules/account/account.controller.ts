import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cookie } from 'next-cookie';
import { User, UserSession } from 'src/server/utils';
import { AccountService } from './account.service';
import { EmailPasswordAuthGuard } from './strategies/email-password.strategy';
import { JwtAuthGuard } from './strategies/jwt.strategy';

@Controller('/api/v1/account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login-with-email-password')
  @UseGuards(EmailPasswordAuthGuard)
  loginWithEmailPassword(@Req() req, @Res({ passthrough: true }) res) {
    const cookies = Cookie.fromApiRoute(req, res);
    const { id, groupId } = req.user;
    const token = this.jwtService.sign(
      { userId: id, groupId: groupId },
      {
        expiresIn: '10d',
      },
    );

    cookies.set('jwt', token);

    console.log('Login successful');
    console.log('Token:', token);

    return {
      success: true,
      token: token,
    };
  }

  @Get('reports')
  @UseGuards(JwtAuthGuard)
  reports(@User() session: UserSession) {
    return {
      ...session,
    };
  }

  /**
   * Registers a user with email and password.
   *
   * @param body - The request body containing the necessary information.
   * @returns An object indicating the success of the registration and the account ID.
   * @throws BadRequestException if the group ID is missing, or if the email or password is missing.
   * @throws BadRequestException if the group ID is invalid.
   */
  @Post('register-with-email-password')
  async registerWithEmailPassword(@Body() body) {
    const { groupId, email, password } = body;

    if (!groupId) {
      throw new BadRequestException('Group id is required');
    }

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const groupEntity = await this.accountService.findGroupById(groupId);

    if (!groupEntity) {
      throw new BadRequestException('Invalid group id');
    }

    console.log('Creating account...');

    const account = await this.accountService.createWithEmailPassword(
      email,
      password,
      groupId,
    );

    console.log('Account created:', account.id);

    return {
      success: true,
      accountId: account.id,
    };
  }
}

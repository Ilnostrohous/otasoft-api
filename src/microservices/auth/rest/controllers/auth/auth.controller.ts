import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from '../../../services/auth/auth.service';
import { AuthCredentialsDto } from '../../dto';
import { RestAuthUserCookie, RestAuthUser } from '../../models';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: change to also accept cookie response
  @Post('/signup')
  async signUp(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<RestAuthUser> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Res() response: Response,
  ): Promise<Response<string[]>> {
    const cookies = await this.authService.signIn(authCredentialsDto);

    response.setHeader('Set-Cookie', [...cookies]);

    return response.send([...cookies]);
  }

  @Post('/signout')
  async signOut(
    @Res() response: Response,
  ): Promise<Response<number>> {
    const signOutCookie = await this.authService.signOut();

    response.setHeader('Set-Cookie', signOutCookie.response);

    return response.sendStatus(200)
  }
}

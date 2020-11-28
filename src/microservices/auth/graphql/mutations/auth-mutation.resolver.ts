import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentialsInput } from '../input';
import { GqlAuthResponseStatus, GqlAuthUser, GqlAuthUserToken } from '../models';

@Resolver((of) => GqlAuthUser)
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  // TODO: change to also accept cookie response
  @Mutation((returns) => GqlAuthUser)
  async signUp(
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUser> {
    return this.authService.signUp(authCredentialsInput);
  }

  @Mutation((returns) => GqlAuthUserToken)
  async signIn(
    @Context() context,
    @Args('authCredentials') authCredentialsInput: AuthCredentialsInput,
  ): Promise<GqlAuthUserToken> {
    const cookieObject = await this.authService.signIn(authCredentialsInput);

    context.res.setHeader('Set-Cookie', cookieObject.cookie);

    return cookieObject;
  }

  @Mutation((returns) => GqlAuthResponseStatus)
  async signOut(
    @Context() context,
  ): Promise<GqlAuthResponseStatus> {
    const signOutCookie = await this.authService.signOut();

    context.res.setHeader('Set-Cookie', signOutCookie.response);

    return { status: 'Signed Out' }
  }
}
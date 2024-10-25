import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput } from './gql_dto/sign-up.input';
import { SignUpPayLoad } from 'src/types/sign-up-payload';
import { SignInPayLoad } from 'src/types/sign-in-payload';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { User } from 'src/users/schema/user.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGqlGuard } from 'src/guards/auth.gql.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignUpPayLoad)
  signUp(@Args('signUp') signUpInput: SignUpInput): Promise<SignUpPayLoad> {
    return this.authService.signUp(signUpInput);
  }

  @Mutation(() => SignInPayLoad)
  signIn(@Args('signIn') signInInput: SignUpInput): Promise<SignInPayLoad> {
    return this.authService.signIn(signInInput);
  }

  @UseGuards(AuthGqlGuard)
  @Query(() => User)
  getProfile(@CurrentUser() user: User): Promise<User> {
    return this.authService.getProfile(user.email);
  }
}

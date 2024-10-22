import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { SignUpTypes, SignInTypes } from 'src/types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpTypes> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<SignInTypes> {
    return this.authService.signIn(signInDto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user.email);
  }
}

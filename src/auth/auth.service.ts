import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpTypes, SignInTypes } from 'src/types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignUpTypes> {
    const { email, password } = signUpDto;

    const emailInUse = await this.userService.findUserWithCredentials(email);

    if (emailInUse) throw new BadRequestException('Email already in use');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (typeof hashedPassword !== 'string' || hashedPassword.length === 0) {
      throw new BadRequestException('Error hashing password');
    }

    const createdUser = await this.userService.create({
      ...signUpDto,
      password: hashedPassword,
    });

    return { message: 'User created successfully', user: createdUser };
  }

  async signIn(signInDto: SignInDto): Promise<SignInTypes> {
    const { email, password } = signInDto;

    const user = await this.userService.findUserWithCredentials(email);

    if (!user) throw new UnauthorizedException('Wrong credentials');

    const arePasswordEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordEqual) throw new UnauthorizedException('Wrong credentials');

    const jwtPayLoad = {
      email: user.email,
      UserId: user._id,
      userName: user.name,
    };

    const access_token = await this.jwtService.sign(jwtPayLoad);

    return { access_token };
  }

  getProfile(email: string) {
    return this.userService.findByEmail(email);
  }
}

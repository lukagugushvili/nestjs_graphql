import { IsNotEmpty } from 'class-validator';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export class SignUpTypes {
  @IsNotEmpty()
  message: string;

  user: SignUpDto;
}

export class SignInTypes {
  @IsNotEmpty()
  access_token: string;
}

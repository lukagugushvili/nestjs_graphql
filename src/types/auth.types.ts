import { SignUpDto } from 'src/auth/dto/sign-up.dto';

export class SignUpTypes {
  message: string;
  user: SignUpDto;
}

export class SignInTypes {
  access_token: string;
}

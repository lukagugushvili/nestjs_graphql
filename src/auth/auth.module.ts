import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}

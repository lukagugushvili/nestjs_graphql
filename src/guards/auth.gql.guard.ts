import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGqlGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = this.extractTokenFromHeader(req);

    if (!token) throw new UnauthorizedException('token is required');

    try {
      const decoded = await this.jwtService.verify(token);
      req.user = decoded;
    } catch (error) {
      console.error('JWT verification error:', error.message);
      throw new UnauthorizedException('Authentication failed');
    }

    return true;
  }

  extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers['token']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

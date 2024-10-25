import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInPayLoad {
  @Field()
  access_token: string;
}

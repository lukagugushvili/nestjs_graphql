import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpPayLoad {
  @Field()
  success: boolean;

  @Field()
  message: string;
}

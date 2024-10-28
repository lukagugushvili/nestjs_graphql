import { Field, ID, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import mongoose from 'mongoose';

@InputType()
export class CreateBookDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  author: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @Field(() => ID)
  @IsNotEmpty()
  @IsMongoId()
  user: mongoose.Schema.Types.ObjectId;
}

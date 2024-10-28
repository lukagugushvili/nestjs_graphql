import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

@ObjectType()
@Schema({ timestamps: true })
export class Book extends Document {
  @Field(() => ID)
  _id: mongoose.Schema.Types.ObjectId;

  @Field()
  @Prop({ unique: true })
  title: string;

  @Field()
  @Prop({ required: true })
  author: string;

  @Field()
  @Prop({ required: true })
  cost: number;

  @Field(() => User)
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: mongoose.Schema.Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from 'src/books/schema/book.schema';

@ObjectType()
@Schema({ timestamps: true })
export class User extends Document {
  @Field(() => ID)
  _id: mongoose.Schema.Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: false })
  age: number;

  @Field()
  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => [Book])
  @Prop({
    required: false,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
  })
  books: mongoose.Schema.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);

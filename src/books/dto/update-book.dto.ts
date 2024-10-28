import { CreateBookDto } from './create-book.dto';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {}

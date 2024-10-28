import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schema/book.schema';
import { IsMongoIdParam } from './dto/mongo-id-param.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Resolver()
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(
    @Args('createBookInput') createBookDto: CreateBookDto,
  ): Promise<Book> {
    try {
      return await this.bookService.create(createBookDto);
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }

  @Query(() => [Book])
  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Query(() => Book)
  getById(@Args('bookIdInput') isMongoIdParam: IsMongoIdParam): Promise<Book> {
    return this.bookService.findBookById(isMongoIdParam);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('updateBookInputId') isMongoIdParam: IsMongoIdParam,
    @Args('updateBookInput') updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.bookService.update(isMongoIdParam, updateBookDto);
  }

  @Mutation(() => Book)
  deleteBook(@Args('bookInput') isMongoIdParam: IsMongoIdParam): Promise<Book> {
    return this.bookService.remove(isMongoIdParam);
  }
}

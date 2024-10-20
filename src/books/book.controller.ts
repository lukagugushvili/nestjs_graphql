import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './schema/book.schema';
import { IsMongoIdParam } from './dto/mongo-id-param.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<CreateBookDto> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Get(':id')
  getById(@Param() isMongoIdParam: IsMongoIdParam): Promise<Book> {
    return this.bookService.getById(isMongoIdParam);
  }

  @Put(':id')
  update(
    @Param() isMongoIdParam: IsMongoIdParam,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<UpdateBookDto> {
    return this.bookService.update(isMongoIdParam, updateBookDto);
  }

  @Delete(':id')
  remove(@Param() isMongoIdParam: IsMongoIdParam): Promise<Book> {
    return this.bookService.remove(isMongoIdParam);
  }
}

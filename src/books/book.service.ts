import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schema/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { IsMongoIdParam } from './dto/mongo-id-param.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    try {
      const existingBook = await this.bookModel
        .findOne({ title: createBookDto.title })
        .exec();

      if (existingBook) {
        throw new BadRequestException('A book with this title already exists');
      }

      const createBook = await this.bookModel.create(createBookDto);

      return createBook;
    } catch (error) {
      this.logger.error('Error creating book', error);
      throw new BadRequestException('Error saving book', error);
    }
  }

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find().exec();

    if (!books || books.length === 0) {
      throw new NotFoundException('No books found');
    }

    return books;
  }

  async findBookById(isMongoIdParam: IsMongoIdParam): Promise<Book> {
    const { id } = isMongoIdParam;

    const book = await this.bookModel.findById(id).exec();

    if (!book) throw new NotFoundException(`Book with ID: ${id} not found`);

    return book;
  }

  async update(
    isMongoIdParam: IsMongoIdParam,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const { id } = isMongoIdParam;

    const updateBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();

    if (!updateBook) throw new NotFoundException(`Book not found`);

    return updateBook;
  }

  async remove(isMongoIdParam: IsMongoIdParam): Promise<Book> {
    const { id } = isMongoIdParam;

    const deleteBook = await this.bookModel.findByIdAndDelete(id).exec();

    if (!deleteBook) {
      throw new NotFoundException(`Book with ID:${id} not found`);
    }

    return deleteBook;
  }
}

import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import { IsMongoIdParam } from 'src/books/dto/mongo-id-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param() isMongoIdParam: IsMongoIdParam): Promise<User> {
    return this.usersService.getById(isMongoIdParam);
  }

  @Put(':id')
  update(
    @Param() isMongoIdParam: IsMongoIdParam,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update(isMongoIdParam, updateUserDto);
  }

  @Delete(':id')
  remove(@Param() isMongoIdParam: IsMongoIdParam): Promise<User> {
    return this.usersService.remove(isMongoIdParam);
  }
}

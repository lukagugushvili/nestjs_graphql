import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { IsMongoIdParam } from 'src/books/dto/mongo-id-param.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    try {
      const createUser = await this.userModel.create(createUserDto);

      return createUser;
    } catch (error) {
      console.error('Error creating user', error);
      throw new BadRequestException('Error saving user', error);
    }
  }

  async getAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    if (!users || users.length === 0) {
      throw new NotFoundException('User not found');
    }

    return users;
  }

  async getById(isMongoIdParam: IsMongoIdParam): Promise<User> {
    const { id } = isMongoIdParam;

    const findById = await this.userModel.findById(id).exec();

    if (!findById) throw new NotFoundException(`User with ID: ${id} not found`);

    return findById;
  }

  async update(
    isMongoIdParam: IsMongoIdParam,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const { id } = isMongoIdParam;

    const updateUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updateUser) throw new NotFoundException(`User not found`);

    return updateUser;
  }

  async remove(isMongoIdParam: IsMongoIdParam): Promise<User> {
    const { id } = isMongoIdParam;

    const deleteUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deleteUser) {
      throw new NotFoundException(`User with ID:${id} not found`);
    }

    return deleteUser;
  }

  findUserWithCredentials(email: string) {
    return this.userModel
      .findOne({ email })
      .select(['email', 'password'])
      .exec();
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).select(['email', 'name']).exec();
  }
}

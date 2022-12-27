import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from 'src/shared/base.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './schema/user.model';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
  ) {
    super();
    this.model = userModel;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }
    // throw new HttpException(
    //   'User with this email does not exist',
    //   HttpStatus.NOT_FOUND,
    // );
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(userData);
    newUser.save();
    return newUser;
  }
}

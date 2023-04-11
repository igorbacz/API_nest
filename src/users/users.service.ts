import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from '../shared/base.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './schema/user.model';
import { error } from 'console';

@Injectable()
export class UsersService extends BaseService<User> {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
  ) {
    super();
    this.model = userModel;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    if (user) {
      this.logger.warn('finded user email ');
      return user;
    }
    this.logger.warn('Failed to find user email ');
    this.logger.error(error);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(userData);
    newUser.save();
    return newUser;
  }
}

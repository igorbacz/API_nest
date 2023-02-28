import { ApiProperty } from '@nestjs/swagger';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HydratedDocument } from 'mongoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';

export type UserDocument = HydratedDocument<User>;

export class User extends BaseModel<User> {
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@user.com',
  })
  @prop()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'user1234',
  })
  @prop()
  password: string;

  @ApiProperty({
    description: 'The token of the user',
    example: '3467hgffghjshaghjhu87656789oijhgfrt567ujhgbvfrt6y7uhbvfg',
  })
  @prop()
  token: string;

  static get model(): ModelType<User> {
    return getModelForClass(User, { schemaOptions });
  }
  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<any> {
    return new this.model();
  }
}

import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HydratedDocument } from 'mongoose';
import { BaseModel, schemaOptions } from 'src/shared/base.model';

export type UserDocument = HydratedDocument<User>;

export class User extends BaseModel<User> {
  @prop()
  email: string;

  @prop()
  password: string;

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

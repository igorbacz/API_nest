import { SchemaOptions } from '@nestjs/mongoose';
import { prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

export class BaseModelVm {
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
}

export abstract class BaseModel<T> extends Document {
  @prop()
  createdAt: Date;

  @prop()
  updatedAt: Date;

  id: string;
}

export const schemaOptions: SchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
};

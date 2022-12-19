import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types, Document } from 'mongoose';

export abstract class BaseService<T extends Document> {
  protected model: ModelType<T>;

  async findAll(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  async create(item: InstanceType<any>): Promise<T> {
    const newItem = new this.model(item);
    const result = await newItem.save();
    return result;
  }

  async delete(id: string): Promise<T> {
    const objId = new Types.ObjectId(id);
    return this.model.findByIdAndDelete(objId);
  }
}

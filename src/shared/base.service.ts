import { ModelType } from '@typegoose/typegoose/lib/types';
import { Types, Document } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';


export abstract class BaseService<T extends Document> {
  public model: ModelType<T>;

  public async findAll(filter = {}): Promise<T[]> {
    return this.model.find(filter).exec();
  }

  public async create(item: InstanceType<any>): Promise<T> {
    const newItem = new this.model(item);
    const result = await newItem.save();
    return result;
  }

  // async getByEmail(email:string):Promise<T>{
  //   const user
  //   return
  // }

  public async update(
    id: string,
    item: InstanceType<any>,
  ): Promise<InstanceType<any>> {
    const objId = new Types.ObjectId(id);
    return this.model.findByIdAndUpdate(objId, item, { new: true }).exec();
  }

  public async delete(id: string): Promise<T> {
    const objId = new Types.ObjectId(id);
    return this.model.findByIdAndDelete(objId);
  }

  public async getById(id: string): Promise<T> {
    const objId = new Types.ObjectId(id);
    const item = await this.model.findOne(objId);
    if (item) {
      return item;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}

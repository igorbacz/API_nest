import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import mongoose, { HydratedDocument } from 'mongoose';
import MongooseSchema from 'mongoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { Geolocation } from './geolocation.schema';
import { TechStack } from './techStack.schema';

export type OfferDocument = HydratedDocument<Offer>;

export class Offer extends BaseModel<Offer> {
  @prop()
  dateAdded: string;

  @prop()
  remote: boolean;

  @prop()
  title: string;

  @prop()
  amount: string;

  @prop()
  city: string;

  @prop()
  companyName: string;

  @prop()
  logo: string;

  @prop()
  mainStack: string;

  @prop()
  adress: string;

  @prop()
  companySize: string;

  @prop()
  exp: string;

  @prop()
  description: string;

  @prop({ type: Geolocation })
  geolocation: Geolocation;

  @prop({ type: TechStack })
  techStack: TechStack[];

  @prop()
  adminEmail: string;

  static get model(): ModelType<Offer> {
    return getModelForClass(Offer, { schemaOptions });
  }
  static get modelName(): string {
    return this.model.modelName;
  }

  static createModel(): InstanceType<any> {
    return new this.model();
  }
}

import { Prop } from '@nestjs/mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import mongoose, { HydratedDocument } from 'mongoose';
import MongooseSchema from 'mongoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { Geolocation } from './geolocation.schema';
import { TechStack } from './techStack.schema';

export type OfferDocument = HydratedDocument<Offer>;

export class Offer extends BaseModel<Offer> {
  @Prop()
  dateAdded: string;

  @Prop()
  remote: boolean;

  @Prop()
  title: string;

  @Prop()
  amount: string;

  @Prop()
  city: string;

  @Prop()
  companyName: string;

  @Prop()
  logo: string;

  @Prop()
  mainStack: string;

  @Prop()
  adress: string;

  @Prop()
  companySize: string;

  @Prop()
  exp: string;

  @Prop()
  description: string;

  @Prop({ type: Geolocation })
  geolocation: Geolocation;

  @Prop({ type: TechStack })
  techStack: TechStack[];

  @Prop()
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

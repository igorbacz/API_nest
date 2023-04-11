import { prop, getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { HydratedDocument } from 'mongoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { Prop } from '@nestjs/mongoose';

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
  address: string;

  @Prop()
  companySize: string;

  @Prop()
  exp: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  geolocation: {
    latitude: { type: number };
    longitude: { type: number };
  };

  @Prop({ type: Array })
  techStack: [
    {
      stackName: { type: String };
      stackLvl: { type: String };
      value: { type: number };
    },
  ];

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

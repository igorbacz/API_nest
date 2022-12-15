import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Geolocation } from './geolocation.schema';
import { TechStack } from './techStack.schema';

export type OfferDocument = HydratedDocument<Offer>;

@Schema({ collection: 'offers' })
export class Offer {
  // @Prop()
  // _id: string;

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

  @Prop()
  geolocation: Geolocation;

  @Prop()
  techStack: TechStack;

  @Prop()
  adminEmail: string;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);

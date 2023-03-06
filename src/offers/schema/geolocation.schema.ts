import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GeolocationDocument = HydratedDocument<Geolocation>;

@Schema()
export class Geolocation {
  @Prop()
  latitude: number;

  @Prop()
  longitude: number;
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);

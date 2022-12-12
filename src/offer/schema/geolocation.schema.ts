import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GeolocationDocument = HydratedDocument<Geolocation>;

@Schema()
export class Geolocation {
  @Prop()
  latitiude: string | number;

  @Prop()
  longitiude: string | number;
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);

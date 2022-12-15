import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TechStackDocument = HydratedDocument<TechStack>;

@Schema()
export class TechStack {
  @Prop()
  stackName: string;

  @Prop()
  stackLvl: string;

  @Prop()
  value: number;
}

export const TechStackSchema = SchemaFactory.createForClass(TechStack);

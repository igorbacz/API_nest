import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from '../shared/base.service';
import { OfferDocument, Offer } from './schema/offer.model';

@Injectable()
export class OffersService extends BaseService<Offer> {
  constructor(
    @InjectModel(Offer.modelName) private readonly offerModel: ModelType<Offer>,
  ) {
    super();
    this.model = offerModel;
  }
}

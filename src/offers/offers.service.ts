import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
// import { Offer, OfferDocument } from 'src/offers/schema/offer.schema';
import { BaseService } from 'src/shared/base.service';
import { OfferDocument, Offer } from './schema/offer.model';

@Injectable()
export class OffersService extends BaseService<OfferDocument> {
  constructor(
    @InjectModel(Offer.modelName) private readonly offerModel: ModelType<Offer>,
  ) {
    super();
    //@ts-ignore
    this.model = offerModel;
  }
}

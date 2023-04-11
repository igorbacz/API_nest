import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { BaseService } from '../shared/base.service';
import { OfferDocument, Offer } from './schema/offer.model';

@Injectable()
export class OffersService extends BaseService<Offer> {
  private readonly logger = new Logger(OffersService.name);
  constructor(
    @InjectModel(Offer.modelName) private readonly offerModel: ModelType<Offer>,
  ) {
    super();
    this.model = offerModel;
  }
}

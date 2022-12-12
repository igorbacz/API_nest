import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from 'src/offer/schema/offer.schema';

@Injectable()
export class OffersService {
  offers: Offer[] = [];

  constructor(
    @InjectModel('Offer') private readonly offerModel: Model<Offer>,
  ) {}

  async getOffers(): Promise<Offer[]> {
    const result = await this.offerModel.find().exec();
    console.log(result);
    return result;
  }
}

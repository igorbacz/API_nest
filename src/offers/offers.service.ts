import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Offer, OfferDocument } from 'src/offers/schema/offer.schema';
import { CreateOfferDto } from './dto/createOffer.dto';

@Injectable()
export class OffersService {
  constructor(@InjectModel('Offer') private offerModel: Model<OfferDocument>) {}

  async getOffers(): Promise<Offer[]> {
    const result = await this.offerModel.find().exec();
    return result;
  }

  async addOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const newOffer = new this.offerModel(createOfferDto);
    const result = await newOffer.save();
    return result;
  }

  async deleteOffer(id: string): Promise<void> {
    try {
      const objId = new Types.ObjectId(id);
      await this.offerModel.findByIdAndDelete(objId);
    } catch (error) {
      console.log(error);
    }
  }
}

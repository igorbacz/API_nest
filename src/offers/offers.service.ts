import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer, OfferDocument } from 'src/offer/schema/offer.schema';
import { CreateOfferDto } from './dto/createOffer.dto';

@Injectable()
export class OffersService {
  constructor(@InjectModel('Offer') private offerModel: Model<OfferDocument>) {}

  async getOffers(): Promise<Offer[]> {
    const result = await this.offerModel.find().exec();
    return result;
  }

  async addOffer(createOfferDto: CreateOfferDto): Promise<Offer> {
    const newOffer = await new this.offerModel(createOfferDto);
    const result = await newOffer.save();
    return result;
  }

  async deleteOffer(id: string) {
    try {
      const offer = await this.offerModel.find({ _id: id }).exec();
      const offerToDelete = { ...offer };
      console.log(offerToDelete);
      if (!offer) {
        throw new Error("Offer doesn't exist");
      }
      await this.offerModel.deleteOne(offerToDelete);
    } catch (error) {
      console.log(error);
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Offer } from 'src/offer/schema/offer.schema';

@Injectable()
export class OffersService {
  offers: Offer[] = [];

  constructor(
    @InjectModel('Offer') private readonly offerModel: Model<Offer>,
  ) {}

  async getOffers(): Promise<Offer[]> {
    const result = await this.offerModel.find().exec();
    return result;
  }

  async addOffer(offer: Offer): Promise<Offer> {
    const newOffer = new this.offerModel(offer);
    const result = await newOffer.save();
    return result;
  }

  async deleteOffer(id: string) {
    try {
      const offer = await this.offerModel.find({ _id: id }).exec();
      const findOffer = { ...offer };
      if (!offer) {
        throw new Error("Offer doesn't exist");
      }
      await this.offerModel.deleteOne(findOffer);
    } catch (error) {
      console.log(error);
    }
  }
}

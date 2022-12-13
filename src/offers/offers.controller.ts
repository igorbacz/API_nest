import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateOfferDto } from 'src/offer/dto/create-offer.dto';
import { Offer } from 'src/offer/schema/offer.schema';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers() {
    return this.offersService.getOffers();
  }

  @Post()
  async createOffer(@Res() response, @Body() offer: Offer) {
    const newOffer = await this.offersService.addOffer(offer);
    return response.status(HttpStatus.CREATED).json({ newOffer });
  }
}

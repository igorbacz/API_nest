import { Controller, Get } from '@nestjs/common';
import { Offer } from 'src/offer/schema/offer.schema';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}
  @Get()
  getAllOffers() {
    return this.offersService.getOffers();
  }
}

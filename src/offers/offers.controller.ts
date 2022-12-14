import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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

  @Delete(':id')
  async deleteOffer(@Param('id') id: string) {
    await this.offersService.deleteOffer(id);
  }
}

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOfferDto } from './dto/createOffer.dto';
import { OffersService } from './offers.service';
import { Offer } from './schema/offer.schema';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers(): Promise<Offer[]> {
    return this.offersService.getOffers();
  }

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.addOffer(createOfferDto);
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.deleteOffer(id);
  }
}

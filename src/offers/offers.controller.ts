import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateOfferDto } from './dto/createOffer.dto';
import { OffersService } from './offers.service';
import { Offer } from './schema/offer.model';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers(): Promise<Offer[]> {
    return this.offersService.findAll();
  }

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    const neww = this.offersService.create(createOfferDto);
    return neww;
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.delete(id);
  }
}

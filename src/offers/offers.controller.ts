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
import { Geolocation } from 'src/offer/schema/geolocation.schema';
import { Offer } from 'src/offer/schema/offer.schema';
import { TechStack } from 'src/offer/schema/techStack.schema';
import { CreateOfferDto } from './dto/createOffer.dto';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers() {
    return this.offersService.getOffers();
  }

  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto) {
    return this.offersService.addOffer(createOfferDto);
    // const newOffer = await this.offersService.addOffer(offer);
    // return response.status(HttpStatus.CREATED).json({ newOffer });
  }

  // @Post()
  // async createOffer(@Res() response, @Body('offer') offer: Offer) {
  //   const newOffer = await this.offersService.addOffer(offer);
  //   return response.status(HttpStatus.CREATED).json({ newOffer });
  // }
  @Delete(':id')
  async deleteOffer(@Param('id') id: string) {
    await this.offersService.deleteOffer(id);
  }
}

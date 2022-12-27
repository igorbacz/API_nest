import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/createOffer.dto';
import { OffersService } from './offers.service';
import { Offer } from './schema/offer.model';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  @Get()
  getAllOffers(): Promise<Offer[]> {
    const offers = this.offersService.findAll();
    return offers;
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    const neww = this.offersService.create(createOfferDto);
    return neww;
  }

  @Put(':id')
  // @UseGuards(AuthGuard('jwt'))
  async updateOffer(
    @Param('id') id: string,
    @Body() content: Offer,
  ): Promise<Offer> {
    return this.offersService.update(id, content);
  }

  @Delete(':id')
  // @UseGuards(AuthGuard('jwt'))
  async deleteOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.delete(id);
  }
}

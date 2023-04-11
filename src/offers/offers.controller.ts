import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateOfferDto } from './dto/CreateOffer.dto';
import { OffersService } from './offers.service';
import { Offer } from './schema/offer.model';

@Controller('offers')
export class OffersController {
  private readonly logger = new Logger(OffersService.name);
  constructor(private offersService: OffersService) {}

  @ApiCreatedResponse({
    description: 'Offers list from database as a response',
    type: [CreateOfferDto],
  })
  @Get()
  getAllOffers(): Promise<Offer[]> {
    const offers = this.offersService.findAll();
    return offers;
  }

  @ApiCreatedResponse({
    description: 'Created offer object as a response',
    type: CreateOfferDto,
  })
  @Post()
  async createOffer(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    const neww = this.offersService.create(createOfferDto);
    return neww;
  }

  @ApiCreatedResponse({
    description: 'Updated offer object as a response',
    type: CreateOfferDto,
  })
  @ApiBody({
    description: 'Content of the updated offer',
    type: CreateOfferDto,
  })
  @Put(':id')
  async updateOffer(
    @Param('id') id: string,
    @Body() content: Offer,
  ): Promise<Offer> {
    return this.offersService.update(id, content);
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: string): Promise<void> {
    await this.offersService.delete(id);
  }
}

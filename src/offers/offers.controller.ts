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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { CreateOfferDto } from './dto/createOffer.dto';
import { OffersService } from './offers.service';
import { Offer } from './schema/offer.model';

@Controller('offers')
export class OffersController {
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
  //TODO
  // @UseGuards(AuthGuard('jwt'))
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

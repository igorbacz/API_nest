import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './schema/offer.model';
import { BaseModel } from '../shared/base.model';
import { BaseService } from 'src/shared/base.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Offer.name, schema: Offer.model.schema },
    ]),
  ],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}

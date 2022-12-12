import { Module } from '@nestjs/common';
import { OffersService } from './offers.service';

@Module({
  providers: [OffersService]
})
export class OffersModule {}

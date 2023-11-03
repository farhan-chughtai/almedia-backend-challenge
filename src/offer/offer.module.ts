import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { Offer1Transformer } from './transformers/offer1.transformer';
import { Offer2Transformer } from './transformers/offer2.transformer';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  controllers: [OfferController],
  providers: [OfferService, Offer1Transformer, Offer2Transformer],
})
export class OfferModule {}

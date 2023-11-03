import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { ERROR } from 'src/constants';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  async processOffer(
    @Body() providerPayload,
    @Query('providerName') providerName: string,
  ): Promise<void> {
    try {
      await this.offerService.processOffer(providerPayload, providerName);
    } catch (error) {
      if (error.message === (ERROR.NO_OFFER_FOUND || ERROR.NO_PROVIDER_FOUND)) {
        throw new NotFoundException(error.message);
      } else if (error.message === ERROR.PAYLOAD_PROVIDER_SCHEMA_MISMATCH) {
        throw new BadRequestException(error.message);
      } else throw new InternalServerErrorException();
    }
  }
}

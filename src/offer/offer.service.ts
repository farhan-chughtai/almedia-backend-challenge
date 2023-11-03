import { Injectable, Logger } from '@nestjs/common';
import { Offer1ResponseDto } from './dtos/offer1.dto';
import { validate } from 'class-validator';
import { PayloadType } from './interfaces/offer.interface';
import { ERROR, PROVIDER_NAME } from '../constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entity/offer.entity';
import { Repository } from 'typeorm';
import { isEmpty } from 'lodash';
import { Offer2ResponseDto } from './dtos/offer2.dto';
import { Offer1Transformer } from './transformers/offer1.transformer';
import { Offer2Transformer } from './transformers/offer2.transformer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly offer1Transformer: Offer1Transformer,
    private readonly offer2Transformer: Offer2Transformer,
  ) {}

  // This is mapping object which is used to provide data at runtime depending upon provider name. Further new object needs to be added for each new provider.
  mappingObject = {
    [PROVIDER_NAME.OFFER1]: {
      path: (payload) => {
        if (
          payload.response &&
          payload.response.offers &&
          !isEmpty(payload.response.offers)
        ) {
          return payload.response.offers;
        } else Logger.warn(ERROR.PAYLOAD_PROVIDER_SCHEMA_MISMATCH);
      },
      dto: `${PROVIDER_NAME.OFFER1}ResponseDto`,
      transformer: this.offer1Transformer.offerTransformer,
    },
    [PROVIDER_NAME.OFFER2]: {
      path: (payload) => {
        if (payload.data && !isEmpty(payload.data)) {
          return payload.data;
        } else Logger.warn(ERROR.PAYLOAD_PROVIDER_SCHEMA_MISMATCH);
      },
      dto: `${PROVIDER_NAME.OFFER2}ResponseDto`,
      transformer: this.offer2Transformer.offerTransformer,
    },
  };

  // This is class mapping object which provides Dto at runtime depending.New Dto responses needs to be added for new provider.
  classMappingObject = {
    Offer1ResponseDto,
    Offer2ResponseDto,
  };

  /**
   * This function is our main function which will validate response and transform data. It may take any response type along with provider name.
   *
   * @param providerPayload response from any provider
   * @param providerName provider
   * returns void
   */
  async processOffer(
    providerPayload: PayloadType,
    providerName: string,
  ): Promise<void> {
    // This function is just calling next function, it is kept separate for future use, if we need to apply some other functionality after storing in db.
    await this.offerTransformValidate(providerPayload, providerName);
  }

  /**
   * This function is used to validate and transform differnet responses as per provider.
   *
   * @param payload
   * @param providerName
   * returns void
   */
  async offerTransformValidate(
    payload: PayloadType,
    providerName: string,
  ): Promise<void> {
    if (this.mappingObject[providerName]) {
      const obj = this.mappingObject[providerName];
      const offersPath = obj.path(payload);
      const offerProvider = obj.dto;
      const offersToBeCreated = [];
      for (const offer in offersPath) {
        if (offer) {
          const offerDtoinstance: any = plainToInstance(
            this.classMappingObject[offerProvider],
            offersPath[+offer],
          );

          const errors = await validate(offerDtoinstance);
          if (errors.length) {
            errors.forEach((error) => {
              Logger.warn(ERROR.VALIDATION, error);
            });
            continue;
          } else {
            // transform Data
            const transformedData =
              this.mappingObject[providerName]['transformer'](offerDtoinstance);
            offersToBeCreated.push(transformedData);
          }
        } else Logger.warn(ERROR.NO_OFFER_FOUND);
      }
      const offersCreated = this.offerRepository.create(offersToBeCreated);
      await this.offerRepository.save(offersCreated);
    } else Logger.warn(ERROR.NO_PROVIDER_FOUND);
  }
}

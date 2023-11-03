import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/utils';
import { IOffer } from '../interfaces/offer.interface';
import { Offer2ResponseDto } from '../dtos/offer2.dto';

@Injectable()
export class Offer2Transformer {
  offerTransformer(payload: Offer2ResponseDto): Omit<IOffer, 'id'> {
    const dataTransformed = {
      name: payload.Offer.name,
      description: payload.Offer.description,
      requirements: payload.Offer.instructions,
      thumbnail: payload.Offer.icon,
      isDesktop: payload.OS.web ? 1 : 0,
      isAndroid: payload.OS.android ? 1 : 0,
      isIos: payload.OS.ios ? 1 : 0,
      offerUrlTemplate: payload.Offer.tracking_url,
      externalOfferId: payload.Offer.campaign_id.toString(),
      slug: Utils.generateUUID(),
      providerName: 'offer2',
    };
    return dataTransformed;
  }
}

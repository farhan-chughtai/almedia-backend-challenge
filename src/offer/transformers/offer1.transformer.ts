import { Injectable } from '@nestjs/common';
import { Utils } from '../../utils/utils';
import { IOffer } from '../interfaces/offer.interface';
import { Offer1ResponseDto } from '../dtos/offer1.dto';

@Injectable()
export class Offer1Transformer {
  offerTransformer(payload: Offer1ResponseDto): Omit<IOffer, 'id'> {
    const dataTransformed = {
      name: payload.offer_name,
      description: payload.offer_desc,
      requirements: payload.call_to_action,
      thumbnail: payload.image_url,
      isDesktop: payload.platform === 'desktop' ? 1 : 0,
      isAndroid:
        payload.platform === 'mobile' && payload.device !== 'iphone_ipad'
          ? 1
          : 0,
      isIos:
        payload.platform === 'mobile' && payload.device === 'iphone_ipad'
          ? 1
          : 0,
      offerUrlTemplate: payload.offer_url,
      externalOfferId: payload.offer_id,
      slug: Utils.generateUUID(),
      providerName: 'offer1',
    };
    return dataTransformed;
  }
}

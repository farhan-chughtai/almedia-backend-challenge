import { Offer2Transformer } from './offer2.transformer';

import { Utils } from '../../utils/utils';
import { payloadOffer2 } from '../payloads/offer2.payload';

describe('Offer1Transformer', () => {
  let offer2Transformer: Offer2Transformer;

  beforeEach(() => {
    offer2Transformer = new Offer2Transformer();
  });

  it('should transform Offer1ResponseDto to IOffer', () => {
    // Mock the generateUUID function from Utils to return a fixed value for testing
    Utils.generateUUID = jest.fn().mockReturnValue('sample-uuid-1234');
    const samplePayload = payloadOffer2.data[15828];
    const transformedOffer = offer2Transformer.offerTransformer(samplePayload);

    expect(transformedOffer.name).toBe(samplePayload.Offer.name);
    expect(transformedOffer.description).toBe(samplePayload.Offer.description);
    expect(transformedOffer.requirements).toBe(
      samplePayload.Offer.instructions,
    );
    expect(transformedOffer.thumbnail).toBe(samplePayload.Offer.icon);
    expect(transformedOffer.isDesktop).toBe(1); // Web should be considered desktop
    expect(transformedOffer.isAndroid).toBe(0);
    expect(transformedOffer.isIos).toBe(1);
    expect(transformedOffer.offerUrlTemplate).toBe(
      samplePayload.Offer.tracking_url,
    );
    expect(transformedOffer.externalOfferId).toBe(
      samplePayload.Offer.campaign_id.toString(),
    );
    expect(transformedOffer.providerName).toBe('offer2');
  });
});

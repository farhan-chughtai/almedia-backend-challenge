import { Offer1Transformer } from './offer1.transformer';
import { Offer1ResponseDto } from '../dtos/offer1.dto';
import { Utils } from '../../utils/utils';

describe('Offer1Transformer', () => {
  let offer1Transformer: Offer1Transformer;

  beforeEach(() => {
    offer1Transformer = new Offer1Transformer();
  });

  it('should transform Offer1ResponseDto to IOffer', () => {
    const samplePayload: Offer1ResponseDto = {
      offer_id: '1234',
      offer_name: 'Sample Offer',
      offer_desc: 'Description of the offer',
      call_to_action: 'Action required for the offer',
      image_url: 'http://sample-image.com/image.jpg',
      platform: 'mobile',
      device: 'iphone_ipad',
      offer_url: 'http://sample-offer.com',
      disclaimer: '',
      offer_url_easy: '',
      payout: 0,
      payout_type: '',
      amount: 0,
      image_url_220x124: '',
      countries: [],
      category: undefined,
      last_modified: 0,
      preview_url: '',
      package_id: '',
      verticals: [],
    };

    const expectedTransformedData = {
      name: samplePayload.offer_name,
      description: samplePayload.offer_desc,
      requirements: samplePayload.call_to_action,
      thumbnail: samplePayload.image_url,
      isDesktop: 0,
      isAndroid: 0,
      isIos: 1,
      offerUrlTemplate: samplePayload.offer_url,
      externalOfferId: samplePayload.offer_id,
      slug: expect.any(String),
      providerName: 'offer1',
    };

    // Mock the generateUUID function from Utils to return a fixed value for testing
    Utils.generateUUID = jest.fn().mockReturnValue('sample-uuid-1234');

    const transformedOffer = offer1Transformer.offerTransformer(samplePayload);

    expect(transformedOffer).toEqual(expectedTransformedData);
    expect(transformedOffer.slug).toBe('sample-uuid-1234');
  });

  it('should return transform to a valid platform & device values for ios', () => {
    const payload: Partial<Offer1ResponseDto> = {
      offer_name: 'Mobile Offer',
      platform: 'mobile',
      device: 'iphone_ipad',
    };

    const transformedOffer = offer1Transformer.offerTransformer(
      payload as Offer1ResponseDto,
    );
    expect(transformedOffer.isDesktop).toBe(0);
    expect(transformedOffer.isAndroid).toBe(0);
    expect(transformedOffer.isIos).toBe(1);
  });

  it('should return transform to a valid platform & device values for android', () => {
    const payload: Partial<Offer1ResponseDto> = {
      offer_name: 'Mobile Offer',
      platform: 'mobile',
      device: 'samsung',
    };

    const transformedOffer = offer1Transformer.offerTransformer(
      payload as Offer1ResponseDto,
    );
    expect(transformedOffer.isDesktop).toBe(0);
    expect(transformedOffer.isAndroid).toBe(1);
    expect(transformedOffer.isIos).toBe(0);
  });

  it('should return transform to a valid desktop platform values', () => {
    const payload: Partial<Offer1ResponseDto> = {
      offer_name: 'Desktop Offer',
      platform: 'desktop',
      device: 'sony',
    };

    const transformedOffer = offer1Transformer.offerTransformer(
      payload as Offer1ResponseDto,
    );
    expect(transformedOffer.isDesktop).toBe(1);
    expect(transformedOffer.isAndroid).toBe(0);
    expect(transformedOffer.isIos).toBe(0);
  });
});

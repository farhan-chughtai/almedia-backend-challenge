import { Offer1ResponseDto } from '../dtos/offer1.dto';
import { Offer2ResponseDto } from '../dtos/offer2.dto';

export interface IOffer {
  id: number;
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId: string;
}

interface Query {
  pubid: string;
  appid: number;
  country: string;
  platform: string;
}

interface Response {
  currency_name: string;
  offers_count: number;
  offers: Offer1ResponseDto[];
}

interface Offer2Data {
  [key: string]: Record<string, Offer2ResponseDto>;
}

export interface Offer1Payload {
  query: Query;
  response: Response;
  // offers: Offer1ResponseDto[];
}
export interface Offer2Payload {
  status: string;
  data: Offer2Data;
}

export type PayloadType = Offer1Payload | Offer2Payload;

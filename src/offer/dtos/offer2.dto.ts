import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class OfferDto {
  @IsNumber()
  campaign_id: number;

  @IsOptional()
  @IsString()
  store_id: string;

  @IsString()
  tracking_type: string;

  @IsString()
  campaign_vertical: string;

  @IsString()
  currency_name_singular: string;

  @IsString()
  currency_name_plural: string;

  @IsString()
  network_epc: string;

  @IsString()
  icon: string;

  @IsString()
  name: string;

  @IsString()
  tracking_url: string;

  @IsString()
  instructions: string;

  @IsOptional()
  @IsString()
  disclaimer: string;

  @IsString()
  description: string;

  @IsString()
  short_description: string;

  @IsString()
  offer_sticker_text_1: string;

  @IsOptional()
  @IsString()
  offer_sticker_text_2: string;

  @IsOptional()
  @IsString()
  offer_sticker_text_3: string;

  @IsString()
  offer_sticker_color_1: string;

  @IsString()
  offer_sticker_color_2: string;

  @IsString()
  offer_sticker_color_3: string;

  @IsString()
  @IsOptional()
  sort_order_setting: string;

  @IsString()
  category_1: string;

  @IsOptional()
  @IsString()
  category_2: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  payout_usd: number;

  @IsDateString()
  start_datetime: string;

  @IsBoolean()
  is_multi_reward: boolean;
}

class CountryDto {
  @IsObject()
  include: object;

  @IsArray()
  exclude: any[];
}

class StateDto {
  @IsArray()
  include: any[];

  @IsArray()
  exclude: any[];
}

class ConnectionTypeDto {
  @IsBoolean()
  cellular: boolean;

  @IsBoolean()
  wifi: boolean;
}

class DeviceDto {
  @IsArray()
  include: any[];

  @IsArray()
  exclude: any[];
}

class OSDto {
  @IsBoolean()
  android: boolean;

  @IsBoolean()
  ios: boolean;

  @IsBoolean()
  web: boolean;

  @IsNumber()
  @IsOptional()
  min_ios: number;

  @IsNumber()
  @IsOptional()
  max_ios: number;

  @IsNumber()
  @IsOptional()
  min_android: number;

  @IsNumber()
  @IsOptional()
  max_android: number;
}

export class Offer2ResponseDto {
  @IsObject()
  @ValidateNested()
  @Type(() => OfferDto)
  Offer: OfferDto;

  @IsObject()
  @ValidateNested()
  @Type(() => CountryDto)
  Country: CountryDto;

  @IsObject()
  @ValidateNested()
  @Type(() => StateDto)
  State: StateDto;

  @IsObject()
  @ValidateNested()
  @Type(() => ConnectionTypeDto)
  Connection_Type: ConnectionTypeDto;

  @IsObject()
  @ValidateNested()
  @Type(() => DeviceDto)
  Device: DeviceDto;

  @IsObject()
  @ValidateNested()
  @Type(() => OSDto)
  OS: OSDto;
}

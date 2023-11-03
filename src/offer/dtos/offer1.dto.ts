import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class VerticalDto {
  @IsString()
  vertical_id: string;

  @IsString()
  vertical_name: string;
}

export class Offer1ResponseDto {
  @IsString()
  offer_id: string;

  @IsString()
  offer_name: string;

  @IsString()
  offer_desc: string;

  @IsString()
  call_to_action: string;

  @IsString()
  disclaimer: string;

  @IsString()
  offer_url: string;

  @IsString()
  offer_url_easy: string;

  @IsNumber()
  payout: number;

  @IsString()
  payout_type: string;

  @IsNumber()
  amount: number;

  @IsString()
  image_url: string;

  @IsString()
  image_url_220x124: string;

  @IsArray()
  @IsString({ each: true })
  countries: string[];

  @IsString()
  platform: string; // possible values are "desktop" | "mobile"

  @IsString()
  device: string; // anything else should be considered as android

  @IsObject()
  category: object;

  @IsNumber()
  last_modified: number;

  @IsString()
  preview_url: string;

  @IsString()
  package_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VerticalDto)
  verticals: VerticalDto[];
}

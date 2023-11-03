import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { payloadOffer1 } from './offer/payloads/offer1.payload';
import { payloadOffer2 } from './offer/payloads/offer2.payload';
import { OfferService } from './offer/offer.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const payloads: { name: string; payload: any }[] = [];

  payloads.push({ name: 'Offer1', payload: payloadOffer1 });
  payloads.push({ name: 'Offer2', payload: payloadOffer2 });

  const offerService = app.get(OfferService);

  const payloadPromises = payloads.map((payload) =>
    offerService.processOffer(payload.payload, payload.name),
  );
  await Promise.all(payloadPromises);

  Logger.log('offers processed successfully');
  await app.listen(3000);
}
bootstrap();

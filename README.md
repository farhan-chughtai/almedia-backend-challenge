# Backend Coding Challenge

# Built With

1. Nest JS
2. PostgreSQL
3. TypeORM
4. Typescript

# Getting Started

## Prerequisites

1. Node version 18.12.1
2. Nest version 10.1.17
3. PostgreSQL 15

## Skeleton

```
├── src
│   ├── config
|   ├── offer
|   ├──   ├── dtos
|   ├──   ├── entity
|   ├──   ├── interfaces
|   ├──   ├── transformers
|   ├──   ├── controller.ts
|   ├──   ├── module.ts
|   ├──   ├── service.ts
|   ├── utils
|   ├── app.module.ts
|   ├── contants.ts
|   ├── main.ts
├── package.json
├── nest-cli.json
├── README.md
├── main.ts
```

## How to use

1. clone the project
2. npm install
3. nest start

## Test cases

1. Use jest framework for testing
2. npm test to run test cases

## ENV FILE

1. Create .env file for database configurations
2. You can use .env-sample file and setup DB according to your credentials

## Steps for new providers

1. I have written code in such a way that logic and functions are not required to update
2. just needs to create new dto for each provider
3. create its corresponding transformer
4. finally update the mappingObject by adding new object there

# Ways to process offers

## 1. From main.ts

Offers will automatically processed as service is also called in main.ts file

## 2. Api in case one want to use service using controller

1. Although service is required, but one api route is created in offer.controller
2. Api Path: http://localhost:3000/offer?providerName=Offer1
3. Body: response payload is required from any provider (provided in challenge)
4. QueryParam: providerName, this will identify the provider for which provided response in body will be validated and transformed
5. This is public route

```

```

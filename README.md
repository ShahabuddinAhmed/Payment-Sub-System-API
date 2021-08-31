# Payment-Sub-System
Payment Sub System API with NestJS

## Description

## Installation with Docker

1. Clone from git

2. cd into Payment-Sub-System

3. run `yarn install` to install all dependencies

## Running the app

```bash
# development mode with Dockerfile.dev
$ dokcer-compose up

# production mode with Dockerfile
$ dokcer-compose up
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Swagger UI Documentation

[Swagger UI Doc](http://localhost:3000/api/v1/doc)

## N.B

In the `invoice_discount` table, the column `name` is considered as both `product category name` or `product name`.
In summary, All product `categories` and `products` are in the `invoice_discount` table.


## License

Nest is [MIT licensed](LICENSE).
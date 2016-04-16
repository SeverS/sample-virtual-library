# A Sample Virtual Library

> This is just a test. Use with cautions.

## Install

clone this repo and `npm install`

## Configure

use `config/default.json5` for development and override them in production(.json5)

## Api Authorization

1. Create a user
2. Copy the generated apikey
3. For POST, PUT, DELETE methods you must set the headers `Access-Control-Request-Headers: X-Api-Key` and `X-Api-Key: <your api key>`

or you can use the Postman collection inside this repo.

## API Endpoints

| Endpoint                     |    method   |  description                       |
|------------------------------|:-----------:|------------------------------------|
| /v1/client                   |    POST     |  create client account             |
| /v1/client                   |    GET      |  get account info (use basic auth) |
| /v1/book                     |    GET      |                                    |
| /v1/book/                    |    POST     |                                    |
| /v1/book/:id                 |    GET      |                                    |
| /v1/book?field=value         |    GET      |                                    |
| /v1/book/:id                 |    PUT      |                                    |
| /v1/book                     |    DELETE   |                                    |


## Roadmap
	• add validators
	• write tests
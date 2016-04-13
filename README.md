# A Sample Virtual Library

> This is just a test. Use with cautions.

## Install

clone this repo and `npm install`

## Configure

use `config/default.json5` for development and override them in production(.json5)

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


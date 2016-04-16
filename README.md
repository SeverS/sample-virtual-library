# A Sample Virtual Library

> This is just a test. Use with cautions.

## Install

Clone this repo, `cd sample-virtual-library && npm install && npm start`;

## Configure

Use `config/default.json5` for development and override them in production(.json5)

## Api Authorization

1. Create a user
2. Copy the generated apikey
3. For POST, PUT, DELETE methods you must set the header `X-Api-Key: <your api key>`

or you can use the Postman collection inside this repo.
> Note: When using SSL make sure you install certificates in Chrome to make Postman work.

## API Endpoints

| Endpoint                                                                                      |    method   |           description              |
|-----------------------------------------------------------------------------------------------|:-----------:|------------------------------------|
| /v1/client                                                                                    |    POST     |  create client account             |
| /v1/client   (use Basic Auth)                                                                 |    GET      |  get account info (use basic auth) |
| /v1/book                                                                                      |    GET      |         get all books              |
| /v1/book/   (X-Api-Key header required)                                                       |    POST     |         create a book              |
| /v1/book/:id                                                                                  |    GET      |         get one book (by id)       |
| /v1/book?where:{"field":"value", "otherField":"otherValue"}&sortOrder=desc&pagesize=10&page=2 |    GET      |         Filter books               |
| /v1/book/:id  (X-Api-Key header required)                                                     |    PUT      |         update a book              |
| /v1/book/:id  (X-Api-Key header required)                                                     |    DELETE   |         delete a book              |

## Entities

**Client**
  - name: `<required>`
  - password: `<required>`
  - apikey: `<auto generated>`
**Book**
  - name: `<required>`
  - author: `<required>`
  - type: `<required>` one of `'ebook', 'paperback', 'hardcover'` or `'audio'`
  - description: `<optional>`
  - isbn: `<optional>`

## Roadmap
  - tests
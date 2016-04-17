// unit tests should be written
import assert from 'assert';
import request from 'supertest';
import {init as modelsInit} from '../models';
import models from '../models';

before(done => {
	Promise.resolve().then(modelsInit).then(() => {
		done()
	});
});
after(() => {
	models.client.destroy({username: 'TestUser'}).then();
	models.client.destroy({username: 'TestUser2'}).then();
	models.book.destroy({name: 'My dummy Book'}).then();
});
describe('models', () => {
	it('should contain 2 models', done => {
		assert.equal(Object.keys(models).length, 2);
		done();
	});
	it('should contain <client> model', done => {
		assert(Object.keys(models).indexOf('client') > -1);
		done()
	});
	it('should contain <book> model', done => {
		assert(Object.keys(models).indexOf('book') > -1);
		done()
	})
	describe('.client', () => {
		describe('.create()', () => {
			it('should create a new client and return <apikey> field', done => {
				const mockUser = {
					username: 'TestUser',
					password: 'testpassword',
				}
				models.client.create(mockUser).then(user => {
					assert.deepEqual(user.username, mockUser.username);
					assert(user.apikey);
					done();
				});
			});
			it('should throw an error if username was not specified', done => {
				const mockUser = {
					username: '',
					password: 'testpassword'
				};
				models.client.create(mockUser).then().catch((err) => {
					assert(err instanceof Error);
					done();
				});
			});
			it('should throw an error if password was not specified', done => {
				const mockUser = {
					username: 'TestUser',
					password: ''
				};
				models.client.create(mockUser).then().catch((err) => {
					assert(err instanceof Error);
					done();
				});
			})
			it('should throw an error if the username already exists', done => {
				const mockUser = {
					username: 'TestUser2',
					password: 'testpassword',
				}
				models.client.create(mockUser).then(() => {
					models.client.create(mockUser).then().catch(err => {
						assert(err instanceof Error);
						done()
					});
				}).catch(err => {
					assert.equal(err, undefined);
					done();
				});
			});
		});
	});
	describe('.book', () => {
		describe('.create()', () => {
			it('should create a book and return fields correctly', done => {
				const dummyBook = {
					name: 'My dummy Book',
					type: 'ebook',
					author: 'Dummy Author',
					description: 'Some description',
					isbn: '123abc123'
				};

				models.book.create(dummyBook).then(book => {
					Object.keys(dummyBook).forEach(bookKeys => {
						assert.deepEqual(dummyBook[bookKeys], book[bookKeys]);
					});
					assert(book.id != undefined);
					done();
				});
			});
		});
		describe('.find(query)', () => {
			it.skip('should filter books by query', done => {
				done();
			});
		});
	});
});
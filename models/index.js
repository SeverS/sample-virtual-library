import Waterline from 'waterline';
import config from 'config';

// import models
import Book from './book';
import Client from './client';

let models = {};

const orm = new Waterline();

const ormConfig = config.orm;
const defaultAdapter = ormConfig.connections[ormConfig.defaultConnection].adapter;

const ormOptions = {
	adapters: {
		'default': require(defaultAdapter),
		'sails-disk': require('sails-disk'),
		'sails-mysql': require('sails-mysql')
	},
	connections: config.orm.connections,
	defaults: {
		migrate: config.orm.migrate
	}
};

export function init() {
	return new Promise((resolve, reject) => {
		orm.loadCollection(Book);
		orm.loadCollection(Client);
		console.log('initializing orm...');
		orm.initialize(ormOptions, (err, modelCollection) => {
			if(err) return reject(err);
			Object.keys(modelCollection.collections).forEach(modelKey => {
				models[modelKey] = modelCollection.collections[modelKey];
			});
			return resolve();
		});
	});
};

export default models;

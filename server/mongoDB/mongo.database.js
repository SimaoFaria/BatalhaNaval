'use strict';

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var db = module.exports = {};

db.connect = function (url, callback){
	MongoClient.connect(url, function (err, database) {
	  	if(err) throw err;
	  	console.log('Connection established to', url);
	  	db.db = database;
		callback();
	});
}


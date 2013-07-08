'use strict';

var assert = require('assert')
  , DbConf = require('./dbconf')
  , MongoClient = require('mongodb').MongoClient
  , should = require('should');

var envHost = process.env['MONGO_NODE_DRIVER_HOST']
  ,envPort = process.env['MONGO_NODE_DRIVER_PORT'] 
  ,envUser = process.env['MONGO_NODE_DRIVER_USER'] 
  ,envPassword = process.env['MONGO_NODE_DRIVER_PASSWORD'] 
  ,user = envUser != null ? envUser: ''
  ,password = envPassword != null ? envPassword: ''
  ,host = envHost != null ? envHost: 'localhost'
  ,port = envPort != null ? envPort: Connection.DEFAULT_PORT
  ,dbName = 'website';

  var exchangeData = {};
  var urlString = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName;

  suite('database', function() {
  test('open should open database connection', function(done) {
    MongoClient.connect(urlString, function(err, db) {
      if (err)
        throw err;

      var collection = db.collection('test_insert');
      collection.insert({
        a : 2
      }, function(err, docs) {

        collection.count(function(err, count) {
          console.log("count = %s", count);
        });

        collection.find().toArray(function(err, results) {
          console.dir(results);
          db.close();
          done();
        });
      });
    });
  });
  test('remove all', function(done) {
    MongoClient.connect(urlString, function(err, db) {
      if (err)
        throw err;
      var collection = db.collection('test_insert');
      collection.remove(function() {
        db.close();
        done();
      });
    });
  });
});
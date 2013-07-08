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

suite('database', function() {
  test('open should open database connection', function(done) {
    var urlString = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName;
    MongoClient.connect(urlString, function(err, db) {
      if(err) throw err;

      var collection = db.collection('test_insert');
      collection.insert({a:2}, function(err, docs) {

        collection.count(function(err, count) {
          console.log("count = %s", count);
        });

        // Locate all the entries using find
        collection.find().toArray(function(err, results) {
          console.dir(results);
          // Let's close the db
          db.close();
          done();
        });
      });
    });
  });
//  test('insertOne should insert a transaction', function(done) {
//    var ord = generateRandom(exchangeData);
//    db.insertOne('transactions', ord, function(err, order) {
//      should.not.exist(err);
//      should.exist(order._id);
//      insertedOrder = order;
//      done();
//    });
//  });
//  test('findOne should find a single transaction', function(done) {
//    var id = insertedOrder._id;
//    db.findOne('transactions', id, function(err, order) {
//      should.not.exist(err);
//      should.exist(order._id);
//      order.price.should.eql(insertedOrder.price);
//      order.volume.should.eql(insertedOrder.volume);
//      done();
//    });
//  });
});
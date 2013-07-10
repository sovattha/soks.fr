'use strict';

var assert = require('assert')
  , DbConf = require('./dbconf')
  , MongoClient = require('mongodb').MongoClient
// Uncomment the following line to use the remote DB 
//  , MongoClient = require('remote-mongodb').MongoClient
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
var urlString = user ? 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName : 
  'mongodb://' + host + ':' + port + '/' + dbName;

MongoClient.connect(urlString, function(err, db) {
  if (err)
    throw err;
  
  describe('database', function() {

    beforeEach(function(done) {
      console.log("Removing all data at %s", urlString);
      if (err)
        throw err;

      db.collection('content').remove(function() {
        db.collection('content').count(function(err, count) {
          console.log("count content = %s", count);
          count.should.equal(0);
        });
        done();
      });
    });
  
    it('should create the index record page', function(done) {
      console.log("Create the index %s", urlString);
      db.collection('content').insert({
        index : {
          title : 'Sovattha Sok',
          description : 'Java & Javascript web developer'
        }
      }, function(err, docs) {
        db.collection('content').count(function(err, count) {
          console.log("count content = %s", count);
          count.should.equal(1);
        });
        done();
      });
      
      it('should create the video record page', function(done) {
        console.log("Create the index %s", urlString);
        db.collection('content').insert({
          video : {
            title : 'My videos',
          }
        }, function(err, docs) {
          db.collection('content').count(function(err, count) {
            console.log("count content = %s", count);
            count.should.equal(2);
          });
          done();
        });
      });
      
      afterEach(function(done) {
        console.log("Closing the session to %s", urlString);
        db.close();
        done();
      });
    });
  });

});
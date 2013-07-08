var MongoClient = require('mongodb').MongoClient;

process.env['MONGO_NODE_DRIVER_USER'] = 'ssok';
process.env['MONGO_NODE_DRIVER_PASSWORD'] = 'sovattha';
process.env['MONGO_NODE_DRIVER_HOST'] = 'ds033818.mongolab.com';
process.env['MONGO_NODE_DRIVER_PORT'] = '33818';

var envHost = process.env['MONGO_NODE_DRIVER_HOST']
  ,envPort = process.env['MONGO_NODE_DRIVER_PORT'] 
  ,envUser = process.env['MONGO_NODE_DRIVER_USER'] 
  ,envPassword = process.env['MONGO_NODE_DRIVER_PASSWORD'] 
  ,user = envUser != null ? envUser: ''
  ,password = envPassword != null ? envPassword: ''
  ,host = envHost != null ? envHost: 'localhost'
  ,port = envPort != null ? envPort: Connection.DEFAULT_PORT
  ,dbName = 'website';

module.exports = {
  find: function(name) {
    MongoClient.collection(name).find();
  },
  insert: function(name, data, callback) {
    MongoClient.collection(name).insert(data, callback);
  },
  open: function(callback) {
    var urlString = 'mongodb://' + user + ':' + password + '@' + host + ':' + port + '/' + dbName, callback;
  	MongoClient.connect(urlString, callback);
  } 
} 
var server = require('../app'),
assert = require('assert'),
http = require('http');

var SERVER_URL_FRAGMENT = 'http://localhost:';
var UNIT_TESTS_PORT = 8000; // Cannot be 80

describe('/', function () {
  it('should return 200', function (done) {
    server.listen(UNIT_TESTS_PORT);
    http.get(SERVER_URL_FRAGMENT + UNIT_TESTS_PORT, function (res) {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  
  pageContains('Sovattha Sok', '/');
  pageContains('My videos', '/video');
  
  function pageContains(word, uri) {
    it('should contain ' + word, function (done) {
      http.get(SERVER_URL_FRAGMENT + UNIT_TESTS_PORT + uri, function (res) {
        var data = '';
        res.on('data', function (chunk) {
          data += chunk;
        });
        res.on('end', function () {
          console.log('Found %s at index %s', word, data.indexOf(word));
          assert.notEqual(data.indexOf(word), -1);
          done();
        });
      });
    });
  }
});
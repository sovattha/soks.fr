var http = require('http');

this.server = http.createServer(function (req, res) {
  console.log('Creating http server');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!\n');
});

exports.listen = function () {
  console.log('http server listening');
  this.server.listen.apply(this.server, arguments);
};

exports.close = function (callback) {
  console.log('http server closing');
  this.server.close(callback);
};
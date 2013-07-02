var express = require('express');
var fs = require('fs');
var app = express();

// The number of milliseconds in one day
var oneDay = 86400000;

// Set path to the views (template) directory
app.set('views', __dirname + '/views');

// Use compress middleware to gzip content
app.use(express.compress());

// Handle GET requests on /
app.get('/', function(req, res) {
	console.log("Index");
	res.render('index.jade');
});
app.get('/video', function(req, res) {
	console.log("Video");
	res.render('video/video.jade', {title: 'Sovattha Sok, my videos'});
});
app.get('/sprites.png', function(req, res) {
	console.log("Sprites");
    var img = fs.readFileSync('./public/sprites.png');
    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(img, 'binary');
});

// Serve up content from public directory
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));
app.use(express.directory(__dirname + '/public'));

app.listen(process.env.PORT || 80);
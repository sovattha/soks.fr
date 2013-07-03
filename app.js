var express = require('express'),
	fs = require('fs'),
	app = express();

// Set path to the views (template) directory
app.set('views', __dirname + '/views');

// Use compress middleware to gzip content
app.use(express.compress());

// Routes
app.get('/', function(req, res) {
	res.render('index.jade', {
		title : 'Java & Javascript web developer'
	});
});
app.get('/video', function(req, res) {
	res.render('video/video.jade', {
		title : 'My videos'
	});
});

// The number of milliseconds in one day
var oneDay = 86400000;
// Serve up content from public directory
app.use(express.static(__dirname + '/public', {
	maxAge : oneDay
}));
app.use(express.directory(__dirname + '/public'));

app.listen(process.env.PORT || 80);
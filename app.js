var express = require('express'),
	fs = require('fs'),
	app = express();

// Set path to the views (template) directory
app.set('views', __dirname + '/views');

// Use compress middleware to gzip content
app.use(express.compress());

app.configure('development', function() {
	app.use(express.errorHandler({
		dumpExceptions : true,
		showStack : true
	}));
});
app.configure('production', function() {
	app.use(express.errorHandler());
});

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
// Handle 404
app.use(function(req, res) {
   res.render('404.jade', 404);
});
// Handle 500
app.use(function(error, req, res, next) {
   res.send('500.jade', 500);
});

app.listen(process.env.PORT || 80);
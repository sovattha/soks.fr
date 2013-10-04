var express = require('express'),
	fs = require('fs'),
	router = require('./router'),
	app = express(),
	companies = require('./quicko/companies');

//The body parser will parse the POST requests
app.use(express.bodyParser());

// Set path to the views (template) directory
app.set('views', __dirname + '/views');

// Enable pretty rendering by Jade
app.locals.pretty = true;

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
app.get('/', router.index);
app.get('/video', router.video);

// Create a company
app.post('/quicko/company', companies.save);
app.get('/quicko/companies', companies.getCompanies);

// The number of milliseconds in one day
var oneDay = 86400000;
// Serve up content from public directory
app.use(express.static(__dirname + '/public', {
	maxAge : oneDay
}));
app.use(express.directory(__dirname + '/public'));
app.use(express.static(__dirname + '/quicko/public', {
	maxAge : oneDay
}));
app.use(express.directory(__dirname + '/quicko/public'));
// Handle 404
app.use(router._404);
// Handle 500
app.use(router._500);

app.listen(process.env.PORT || 80);

exports.listen = function (port) {
  app.listen(port);
};
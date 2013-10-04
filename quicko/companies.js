var MongoClient = require('mongodb').MongoClient,
	ObjectID = require('mongodb').ObjectID,
    Server = require('mongodb').Server,
    db,
    _ = require('underscore');

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db('quicko');
});

exports.getCompanies = function(req, res) {
    db.collection('companies', function(err, collection) {
        collection.find({'deleted': {$ne: true}}, {sort: [['name', 1]]}).toArray(function(err, projects) {
            res.json(projects);
        });
    });
};

exports.save = function(req, res) {
	var company = req.body;
	console.log('New company', company);
	db.collection('companies', function(err, collection) {
		db.collection('companies').save(company, {safe:true}, function(err, result) {
			if (err)
				console.error(err);
			console.log('Company saved', result);
			res.json(result);
		});
	});
};

module.exports = {
    index : function(req, res) {
      res.render('index.jade', {
        title : 'Java & Javascript web developer'
      });
    },
    traffic : function(req, res) {
    	res.render('traffic.jade', {
    		title : 'Traffic around Geneva'
    	});
    },
    video : function(req, res) {
      res.render('video/video.jade', {
        title : 'My videos'
      });
    },
    _404 : function(req, res) {
      res.render('404.jade', 404);
    },
    _500 : function(error, req, res, next) {
      res.send('500.jade', 500);
    }
};

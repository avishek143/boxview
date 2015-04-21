var key = 'b3xsdhpp97qvqfulqh36exf5f1ns42wj';
var client = require('box-view').createClient(key);

var uploadURL = function(req, res){
	var url = req.body.docUrl;
	res.set('Content-Type', 'application/json');
	if(!url){
		res.status(404).json({err_type:'no_url'});
	} else {
		client.documents.uploadURL(url, function(err, obj, resp){
			if (err){
				res.status(404).json({err_type:'box-error'})
			}

			res.json(obj);
		});
	}
}

var getStatus = function(req, res){
	var id = req.body.docId;
	res.set('Content-Type', 'application/json');
	if(!id){
		res.status(404).json({err_type:'no_id'});
	} else {
		client.documents.get(id, function(err, obj, resp){
			if (err){
				res.status(404).json({err_type:'box-error'})
			}

			res.json(obj);
		});	
	}
};

var getSession = function(req, res){
	var id = req.body.docId;
	res.set('Content-Type', 'application/json');
	if(!id){
		res.status(404).json({err_type:'no_id'});
	} else {
		client.sessions.create(id, function(err, obj, resp){
			if (err){
				res.status(404).json({err_type:'box-error'})
			}

			res.json(obj);
		});
	}
}

module.exports = function(app){
	app.post('/convert', uploadURL);
	app.post('/status', getStatus);
	app.post('/doc', getSession);
};
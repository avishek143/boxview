var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

require('./routes')(app);

var server = app.listen(3000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server running at http://%s:%s', host, port);
});
var key = 'b3xsdhpp97qvqfulqh36exf5f1ns42wj';
var client = require('box-view').createClient(key);

module.exports = function(sio){
	sio.on('connection', function(socket){
		console.log("Socket with id: " + socket.id + ' connected')
		/* Conversion Request Listener */
		socket.on('convert', function(data){
			console.log('Socket with id:' + socket.id + ' recieved data:' + data);
			var url = data.docUrl;			
			if(!url){
				socket.emit('error', {msg:'no_url'})
			} else {
				client.documents.uploadURL(url, function(err, obj, resp){
					if (err){
						socket.emit('error', {msg:'box-error'});
					}
					console.log('Socket with id: ' + socket.id + " recieved response for document named: " + obj.name);
					socket.join(obj.id);
					socket.emit('doc_uploaded', obj);
					if(obj.status === 'done'){ /*take care of error status*/
						setUpSession(obj.id);						
					} else {
						setTimeout(function(){getStatus(obj.id)}, 0);
					}
				});
			}
		});
	});	


	var getStatus = function(id){
		client.documents.get(id, function(err, obj, resp){
			if(err){
				/* Send error to all sockets */
			} else {
				/* Send status to all documents */
				if(obj.status === 'done'){ /*take care of error status*/
					sendStatus(id, obj);
					setUpSession(id);
				} else {
					sendStatus(id, obj);
					setTimeout(function(){getStatus(obj.id)}, 500);
				}
			}
		});
	};

	var sendStatus = function(id, status_obj){
		console.log(status_obj);
		sio.sockets.in(id).emit('doc_status_updated', status_obj);
	};

	var setUpSession = function(id){
		client.sessions.create(id, function(err, obj, resp){
			if(err){
				/* Send error to all sockets */
			} else {
				console.log(obj);
				sendSession(id, obj);
			}
		});
	};

	var sendSession = function(id, session){
			sio.sockets.in(id).emit('doc_converted', session);
	};
};
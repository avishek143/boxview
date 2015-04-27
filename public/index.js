$('#convert').click(function(){
	var data = {
		docUrl : $('#docurl').val()
	};

	socket.emit('convert', data);
	/*$.ajax({
				url : 'convert',
				type : 'POST',
				data : data,
				dataType : 'json',
				success : function(res){
					$('#docid').val(res.id);
					setStatus(res.status);
				},
				error:function(xhr, status){
					console.log(xhr.responseText);
				}
		});*/
});

$('#getstatus').click(function(){
	var data = {
		docId : $('#docid').val()
	};

	$.ajax({
				url : 'status',
				type : 'POST',
				data : data,
				dataType : 'json',
				success : function(res){
					setStatus(res.status);					
				},
				error:function(xhr, status){
					console.log(xhr.responseText);
				}
		});
});

$('#showdoc').click(function(){
	var data = {
		docId : $('#docid').val()
	};

	$.ajax({
				url : 'doc',
				type : 'POST',
				data : data,
				dataType : 'json',
				success : function(res){
					showDoc(res.urls.assets);					
				},
				error:function(xhr, status){
					console.log(xhr.responseText);
				}
		});
});

var showDoc = function(assets){
	var viewer = Crocodoc.createViewer('#viewer-target', {
		url : assets
	});
	viewer.load();
}

var setStatus = function(status){
	$('#status').html(status);
	switch (status){
		case 'done' : $('#status').removeClass().addClass('bg-success'); break;
		case 'error' : $('#status').removeClass().addClass('bg-danger'); break;
		default : $('#status').removeClass().addClass('bg-info'); break;
	}	2015
};

var setDocId = function(id){
	$('#docid').val(id);
}

var socket = io();

socket.on('doc_uploaded', function(data){
	console.log(data);
	setDocId(data.id);
	setStatus(data.status);
});

socket.on('doc_status_updated', function(data){
	console.log(data);
	setStatus(data.status);
});

socket.on('doc_converted', function(data){
	console.log(data);
	showDoc(data.urls.assets);
});

/* implement error listener */
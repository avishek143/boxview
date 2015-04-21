$('#convert').click(function(){
	var data = {
		docUrl : $('#docurl').val()
	};

	$.ajax({
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
		});
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
					var viewer = Crocodoc.createViewer('#viewer-target', {
						url : res.urls.assets
					});
					viewer.load();
				},
				error:function(xhr, status){
					console.log(xhr.responseText);
				}
		});
});

var setStatus = function(status){
	$('#status').html(status);
	switch (status){
		case 'done' : $('#status').removeClass().addClass('bg-success'); break;
		case 'error' : $('#status').removeClass().addClass('bg-danger'); break;
		default : $('#status').removeClass().addClass('bg-info'); break;
	}	
};

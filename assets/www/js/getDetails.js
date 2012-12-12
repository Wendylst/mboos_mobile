$('#detailsPage').live('pageshow', function(event) {

	var id = getUrlVars()["id"];
	
	alert(id);
 /*	$.get("http://192.168.0.100/services/getdata.php", {id: id})
	.success(function(data) {
		//alert(data);
		//$('#dataDetails').append(data.id);
		$.each(data, function(key, val) {
		    alert('<li>' + val + '</li>');
		  });
                    
	});  */
 	
 	/*
	.each(data, function(index, data) {
		$('#dataDetails').append(data.item);
	});
	 */
	/*$.getJSON('http://192.168.0.100/services/getdata.php?id='+id, function(data) {
		  
			var datas = data.item;
			$.each(datas, function(index, data) {
				$('#dataDetails').append(data);
			});

		}); */
	
/*	$.get("http://192.168.1.102/services/getemployee.php?id="+id,
			   function(data){
			    // $('#dataDetails').append( "id: " + data.id ) // John
			    //          .append( "Name: " + data.firstName ); //  2pm
				$('#fullName').text(data.firstName + ' ' + data.lastName);
				$('#dataTitle').text(data.title);
				$('#city').text(data.city);
				
			   }, "json");*/

});


function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
	


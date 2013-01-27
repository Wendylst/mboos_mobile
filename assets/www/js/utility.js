var serviceURL = "http://192.168.1.103/MBOOS/mobile_ajax/mobile/";

var temp_id = null;

$(document).live("pageinit", function(event){

	var value = window.localStorage.getItem("reg_setup");
   
	if(value == 1) {
		
		categoryPage();
		searchPage();
		
		
		
	} else {
		
		$.mobile.changePage( "registration.html", { transition: "slideup"} );
		
	}


});


$('#detailsPage').live("pageshow", function(event){

	get_info();
	
    /*Add to Cart Script*/
    
    $('.addCartBtn').click(function() {
    	

    		//'id'=>'1','name'=>'ian'+'id'=>'2','name'=>'paul'
        	var item = [$('input.item_id').val() + ","+ $('input.item_name_val').val() + ","+ $('input.item_price_val').val() + ","+ $('input.qtyForm').val() + ""];
        	
        	var strItem = item.toString();
        	var items = strItem.split(",");
        	

        	addItem(items[0], items[1], items[2], items[3]);
    		
	
    });
   
	
});

/* Script for Registration Page*/
$('#regPage').live("pageshow", function(event){
	


	$('.saveBtn').click(function() {
		
		if($('#fname').val().length == 0) {
			
			$('#fname').addClass("error").focus();
			
		} else {
		
		
			var name = $('#fname').val();
			var addr = $('#address').val();
			var email = $('#email').val();
			var number = $('#cNumber').val();
			
		
			var custInfo = {
		            "name": name,
		            "addr": addr,
		            "email": email,
		            "number": number,
		        };
			
			// store the custInfo
			localStorage.setItem('customer_info', JSON.stringify(custInfo));
			
			window.localStorage.setItem("reg_setup", "1");
			window.location.href = 'index.html';
			
		}
	});
	
});

/* Script for Category Item Page*/
$('#categoryPage').live("pageshow", function(event){

	get_cat_info();
	
});

/* function for Category Page */
function get_cat_info() {
	
	var id;
	
	id = getUrlVars()["id"];
		
	
	$.getJSON(serviceURL + 'getByCategory?id='+id, function(data) {
	$('#category_data li').remove();
	cat_item = data.cat_item_list;
	
		$.each(cat_item, function(index, info) {
			$('#category_data').append('<li><a class="id_item" href="buy_item.html?id=' + info.mboos_product_id + '">' +
					'<h4>' + info.mboos_product_name +'</h4>' + '<p>' + info.mboos_product_price + '</p>' +
					"</a><a class='id_link' href='buy_item.html?id=" + info.mboos_product_id + "'  data-transition='slideup'>Add to Cart</a></li>");
					    			
		});
		
		$('#category_data').listview('refresh');
	});
	
} 

/* Script for Category Item Page*/
$('#categoriesPage').live("pageshow", function(event){

	categoryPage();
	
});

/* Get the ID from URL */
function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    
		for(var i = 0; i < hashes.length; i++) {
		    hash = hashes[i].split('=');
		        vars.push(hash[0]);
		        vars[hash[0]] = hash[1];
		    }
		    return vars;
		}  

/* Get Item Info from Search List*/
function get_info() {
	
	
	var id = getUrlVars()["id"];
	
	$.getJSON(serviceURL + 'get_info?id='+id, function(data) {
		
	item_info = data.item_info;
	
		$.each(item_info, function(index, info) {
			
			$('label.item_name').append(info.mboos_product_name);
			$('label.item_price').append("PHP"+info.mboos_product_price);
			$('p.item_image').append('<img src="http://192.168.1.101/MBOOS/images/item_images/' + info.mboos_product_image + '" height="100" width="100">');
			$('li.item_availability').append(info.mboos_product_availability);
			$('p.item_desc').append(info.mboos_product_desc);
			$('input.item_id').val(info.mboos_product_id);
			$('input.item_name_val').val(info.mboos_product_name);
			$('input.item_price_val').val(info.mboos_product_price);
				
				
			});
		
	
	});
	
}    

function categoryPage() {
	
	
	$.getJSON(serviceURL + 'get_categories', function(data) {
		
	$('#categoryList li').remove();
	categories = data.categories;
	
		$.each(categories, function(index, category) {
			$('#categoryList').append('<li><a class="id_item" href="category_item.html?id=' + category.mboos_product_category_id + '">' +
					'<h4>' + category.mboos_product_category_name +'</h4>' +
					'</a></li>');
		});
	
	$('#categoryList').listview('refresh');

	});
}

function searchPage() {
	

	$.getJSON(serviceURL + 'search', function(data) {
	$('#search_data li').remove();
	products = data.products;
	
		$.each(products, function(index, product) {
			$('#search_data').append('<li><a class="id_item" href="buy_item.html?id=' + product.mboos_product_id + '">' +
					'<h4>' + product.mboos_product_name +'</h4>' +
					"</a><a class='id_link' href='buy_item.html?id=" + product.mboos_product_id + "'  data-transition='slideup'>Add to Cart</a></li>");
					    			
		});
		
	$('#search_data').listview('refresh');
});

	
}


$(".sRefreshBtn").live( "click", function(event, ui) {
	
	$("#sRefreshMsg").popup('open');
	window.setTimeout(function() {$("#sRefreshMsg").popup('close')}, 1000);
	searchPage();
	
	});

$(".cRefreshBtn").live( "click", function(event, ui) {
	
	$("#cRefreshMsg").popup('open');
	window.setTimeout(function() {$("#cRefreshMsg").popup('close')}, 1000);
	categoryPage();
	
	});

$('#cartPage').live("pageshow", function(event){

	setupDB();
	
	$('.checkoutBtn').click(function() {
		
		var cart_items = localStorage.getItem("cart_items")
		
		if(cart_items == 0) {
			
			$("#checkoutMsg").popup('open');
			window.setTimeout(function() {$("#checkoutMsg").popup('close')}, 1000);
			return false;	
			
		} else {
			
			return true;
			
		}		
	});
	
});

$('#checkoutPage').live("pageshow", function(event) {
	
	var cInfo = JSON.parse(localStorage.getItem("customer_info"));
	var Name = cInfo.name;
	
	
	$('.paypalBtn').click(function() {
		
		var username = $('#username').val();
		var pword = $('#password').val();
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if(username == "") { 
			
			$("#uValidationMsg").popup('open');
			window.setTimeout(function() {$("#uValidationMsg").popup('close')}, 1000);
			return false;
			
		} else if(!username.match(emailExp)) {
			
			$("#eValidationMsg").popup('open');
			window.setTimeout(function() {$("#eValidationMsg").popup('close')}, 1000);
			return false;
			
			
		} else if(pword == "") {
			
			$("#pValidationMsg").popup('open');
			window.setTimeout(function() {$("#pValidationMsg").popup('close')}, 1000);
			return false;
			
		} else {
			
			return true;
			
		}
		
	});
	query_cart();
	
	
});

$('#profilePage').live("pageshow", function(event) {
	
	var cInfo = JSON.parse(localStorage.getItem("customer_info"));
	var cName = cInfo.name;
	var cAddr = cInfo.addr;
	var cEmail = cInfo.email;
	var cNumber = cInfo.number;
	
	$('#cName').val(cName);
	$('#address').val(cAddr);
	$('#email').val(cEmail);
	$('#cNumber').val(cNumber);
	
	$('.profileSaveBtn').click(function() {
		
		var name = $('#cName').val();
		var addr = $('#address').val();
		var email = $('#email').val();
		var number = $('#cNumber').val();
		
		var custInfo = {
	            "name": name,
	            "addr": addr,
	            "email": email,
	            "number": number,
	        };
		
		// store the custInfo
		localStorage.setItem('customer_info', JSON.stringify(custInfo));
		
	});
});

$('#confirmationPage').live("pageshow", function(event) {
	
	emptyDB();
	var datas = localStorage.getItem("all_items");
	alert(datas);

});

function query_cart() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('SELECT * FROM CART', [], cart_serps, errorCB);
	
	}, dbErrorHandler);
}

function cart_serps(tx, results) {
	
var len = results.rows.length;
var item_lists = [];

	for (var i=0; i<len; i++){
		
		order = ["+'id' => '" + results.rows.item(i).item_id + "'", "'name' => '"+ results.rows.item(i).item_name  +"'", "'price' => '"+ results.rows.item(i).item_price +"'", "'qty' => '" + results.rows.item(i).item_qty + "'"]
		
		item_lists.push(order);			
	
	    }
	
	var strItem_list = item_lists.toString();
	localStorage.setItem('all_items', strItem_list);
	
	
}


function emptyDB() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('DROP TABLE CART');
	
	}, dbErrorHandler);
}

	    
function populateDB(tx) {
		
        tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id INTEGER PRIMARY KEY, item_id, item_name, item_price DOUBLE(3,2), item_qty, price_total DOUBLE(16,2))');


}

// Query the database

function queryDB(tx) {
	
    tx.executeSql('SELECT * FROM CART', [], querySuccess, errorCB);
    tx.executeSql('SELECT SUM(price_total) AS itemSubtotal FROM CART', [], querySubTotalSuccess, errorCB);
    
}

// Query the success callback
function querySuccess(tx, results) {

	var len = results.rows.length;
	
	// var for checking the Cart
	localStorage.setItem('cart_items', len);
	
	for (var i=0; i<len; i++){
		
			$('#cart_data').append('<li><a class="cart_edit_item" href="cart_edit_item.html?id=' + results.rows.item(i).id + '">' +
							'<h4>' + results.rows.item(i).item_name  +'</h4>' + 
							'<p>PHP ' + results.rows.item(i).item_price + '</p>' +
							'<a class="deleteBtn" href="item_delete.html?id=' + results.rows.item(i).id + '" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a> ' +
							'</a><span class="ui-li-count">'+ results.rows.item(i).item_qty +'</span></li>'); 
			$("#cart_data").listview("refresh");
			
	    }

    
}

function querySubTotalSuccess(tx, results) {
	
	if(results.rows.item(0).itemSubtotal == null) {
		
		$('#subtotalVal').empty().append("PHP 0");
		
	} else {
		
		var num = results.rows.item(0).itemSubtotal;
		var result = Math.round(num*100)/100;
		
		$('#subtotalVal').empty().append("PHP " + result + "");
	}
	
	

}

// Transaction error callback

function errorCB(err) {
	
    console.log("Error processing SQL: "+err.code);
    
}

// Transaction success callback
//
function successCB() {
	
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(queryDB, errorCB);
    
}

// PhoneGap is ready
function setupDB() {
	
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB, successCB);
    
}


function addItem(id, name, price, qty) {
	
	var total_price = price * qty;
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('INSERT INTO CART (item_id, item_name, item_price, item_qty, price_total) VALUES ("' + id + '","' + name +'","' + price +'","' + qty +'","' + total_price + '")');
	
	}, dbErrorHandler);
}

function dbErrorHandler(err){
    alert("DB Error: "+err.message + "\nCode="+err.code);
}

/* Cart Features Script */

$('#delete_itemPage').live("pageshow", function(event){

	delete_item(); 
	
	$.mobile.changePage( "cart.html", { transition: "slideup"} );
	
});

/* function for Category Page */
function delete_item() {
	
	var id;
	
	id = getUrlVars()["id"];
		
	del_table(id);
	
} 


function del_table(id) {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('DELETE FROM CART WHERE id ="' + id + '"');
	
	}, dbErrorHandler);
}

$('#editPage').live("pageshow", function(event){

	var id;
	
	id = getUrlVars()["id"];
	
	select_table(id);
	
});

function select_table(id) {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('SELECT * FROM CART WHERE id="' + id + '"', [], selected_query, errorCB);
	
	}, dbErrorHandler);
}

//Query the success callback
function selected_query(tx, results) {

	var len = results.rows.length;
	
	for (var i=0; i<len; i++){
		
		
		$('.item_name').append(results.rows.item(i).item_name);
		$('.item_price').append(results.rows.item(i).item_price);
		$('.qtyForm').val(results.rows.item(i).item_qty);
		$('.cart_id').val(results.rows.item(i).id);
		
		$('.item_id').val(results.rows.item(i).item_id);
		$('.item_name_val').val(results.rows.item(i).item_name);	
		$('.item_price_val').val(results.rows.item(i).item_price);	
	    }  
}

$('#editPage').live("pageshow", function(event){

    $('.saveBtn').click(function() {
    	
    	var name = $('.item_name_val').val();
    	var price = $('.item_price_val').val();
    	var qty = $('.qtyForm').val();
    	var cart_id = $('.cart_id').val();
    	var item_id = $('.item_id').val();
    	var total_price = qty * price;
    	
    	update_table(cart_id,qty, total_price);
	
    });
   
	
});

function update_table(id, qty, ttl_price) {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
		//item_id, item_name, item_price, item_qty
		tx.executeSql('UPDATE CART SET item_qty='+ qty +', price_total='+ ttl_price +' WHERE id="'+ id +'"', [], errorCB);
	
	}, dbErrorHandler);
}






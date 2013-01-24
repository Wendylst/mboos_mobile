var serviceURL = "http://192.168.1.101/MBOOS/mobile_ajax/mobile/";

var temp_id = null;
var reg_id = null;

$(document).live("pageinit", function(event){
	
	reg_checker();
	queryRegTable();
	
	if(reg_id == 1) {
		
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
    	
    	//alert('DONE');
	
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
		
		//alert("Saving....");
		save_reg();
		$.mobile.changePage( "index.html", { transition: "slideup"} );
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

	//$('p.item_name').empty().append(id);
	
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



$('a.id_item').live('click', function(event) {
	
});

$('a.id_link').live('click', function(event) {
		
	});
	
}


$(".refreshBtn").live( "click", function(event, ui) {
	
	searchPage();
	
	});

$('#cartPage').live("pageshow", function(event){

	setupDB();

    $('a.deleteBtn').click(function() {
    	
    	alert('deleting...');

    });

	
});

$('#checkoutPage').live("pageshow", function(event) {
	
	emptyDB();
	
	
});

function emptyDB() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('DROP TABLE CART');
	
	}, dbErrorHandler);
}

	    
function populateDB(tx) {
		
        tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id INTEGER PRIMARY KEY, item_id, item_name, item_price DOUBLE(16,2), item_qty, price_total DOUBLE(16,2))');


}

// Query the database

function queryDB(tx) {
	
    tx.executeSql('SELECT * FROM CART', [], querySuccess, errorCB);
    tx.executeSql('SELECT SUM(price_total) AS itemSubtotal FROM CART', [], querySubTotalSuccess, errorCB);
    
}

// Query the success callback
function querySuccess(tx, results) {

	var len = results.rows.length;
	
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
		
		$('#cartSubtotal').append("0");
		
	} else {
		$('#cartSubtotal').append("PHP " + results.rows.item(0).itemSubtotal + "");
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

	window.location.href = 'cart.html';
	
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
    	
    	//alert('Saving...');
    	var name = $('.item_name_val').val();
    	var price = $('.item_price_val').val();
    	var qty = $('.qtyForm').val();
    	var cart_id = $('.cart_id').val();
    	var item_id = $('.item_id').val();
    	var total_price = qty * price;
    	//alert(name + price + qty + id + item_id);
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


function reg_checker() {
	
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(createRegTable, errorCB);
    
}

function createRegTable(tx) {
	
    tx.executeSql('CREATE TABLE IF NOT EXISTS USERINFO (id unique, status)');  

}


function queryRegTable() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('SELECT * FROM USERINFO WHERE status="1"', [], selected_regTable, errorCB);
	
	}, dbErrorHandler);
}

function selected_regTable(tx, results) {

	reg_id = results.rows.length;
	
	return reg_id;
}

function save_reg() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('INSERT INTO USERINFO (status) VALUES ("1")');
	
	}, dbErrorHandler);
}

function drop_regTable() {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('DROP TABLE USERINFO');
	
	}, dbErrorHandler);
}



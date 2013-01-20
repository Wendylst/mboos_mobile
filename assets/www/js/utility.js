var serviceURL = "http://192.168.1.101/MBOOS/mobile_ajax/mobile/";

var temp_id = null;

$(document).live("pageinit", function(event){
	
	categoryPage();
	searchPage();

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
					'<h4>' + info.mboos_product_name +'</h4>' +
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
		
        tx.executeSql('CREATE TABLE IF NOT EXISTS CART (id INTEGER PRIMARY KEY, item_id, item_name, item_price, item_qty)');


}

// Query the database

function queryDB(tx) {
	
    tx.executeSql('SELECT * FROM CART', [], querySuccess, errorCB);
    tx.executeSql('SELECT SUM(item_price) AS itemSubtotal FROM CART', [], querySubTotalSuccess, errorCB);
    
}

// Query the success callback
function querySuccess(tx, results) {

	var len = results.rows.length;
	
	for (var i=0; i<len; i++){
		
			$('#cart_data').append('<li><a class="cart_edit_item" href="cart_edit_item.html?id=' + results.rows.item(i).item_id + '">' +
							'<h4>' + results.rows.item(i).item_name  +'</h4>' + '</a><span class="ui-li-count">'+ results.rows.item(i).item_qty +'</span></li>'); 
			$("#cart_data").listview("refresh");
			
	    }

    
}

function querySubTotalSuccess(tx, results) {
	
	$('#cartSubtotal').append("PHP" + results.rows.item(0).itemSubtotal + "");
	

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
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('INSERT INTO CART (item_id, item_name, item_price, item_qty) VALUES ("' + id + '","' + name +'","' + price +'","' + qty +'")');
	
	}, dbErrorHandler);
}

function dbErrorHandler(err){
    alert("DB Error: "+err.message + "\nCode="+err.code);
}

/*Checking if there's Internet Connection Script */





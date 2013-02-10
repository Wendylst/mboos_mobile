/* Script for Registration Page*/
$('#domainPage').live("pageshow", function(event){
	
	
	var domainName = window.localStorage.getItem("domain_name");
	
	$('.dName').change(function() {
		
		$(this).removeClass("error");
		
	});
	
	if(domainName == null) {
		
		$('.saveDomainBtn').click(function() {

			setTimeout(function (){
				
				
				if($('.dName').val().length == 0) {

						$('.dName').addClass("error").focus();
			
				} else {
		        	
					var domain_name = $('.dName').val();
					
					$("#savingDomainMsg").popup('open');
					window.setTimeout(function() {$("#savingDomainMsg").popup('close')}, 1000);
					
					
					window.localStorage.setItem("domain_name", domain_name);
					window.localStorage.setItem("domain_setup", "1");
					window.location.href = 'login.html';
		        	
		        }
		    }, 3000)
			
			
		});
		
	} else {
		
		$('.dName').val(domainName);
		
		$('.saveDomainBtn').click(function() {

			setTimeout(function (){
				
				
				if($('.dName').val().length == 0) {

						$('.dName').addClass("error").focus();
			
				} else {
		        	
					var domain_name = $('.dName').val();
					
					$("#savingDomainMsg").popup('open');
					window.setTimeout(function() {$("#savingDomainMsg").popup('close')}, 1000);
					
					
					window.localStorage.setItem("domain_name", domain_name);
					window.localStorage.setItem("domain_setup", "1");
					window.location.href = 'login.html';
		        	
		        }
		    }, 3000)
			
			
		});
		
	}
	
	
	
});

/* Script for forgot password Page*/
$('#forgotPasswordPage').live("pageshow", function(event){
	

	
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	var domainName = window.localStorage.getItem("domain_name");
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/login/";
	
	$('.resetBtn').click(function() {
		
		if($('.your_email').val().length == 0 ) {
			
			$('.your_email').addClass("error");
			
			$("#pwordRequiredEmail").popup('open');
			window.setTimeout(function() {$("#pwordRequiredEmail").popup('close')}, 3000);
			
			
		} else if(!$('.your_email').val().match(emailExp)) {
			
			$('.email').addClass("error");
			$("#pwordInvalidEmail").popup('open');
			window.setTimeout(function() {$("#pwordInvalidEmail").popup('close')}, 3000);
			
		} else {
			
			
			$.ajax({
				error		: function (req, status, error) {
	      					if(status == "timeout") 
	 	
	      					$("#forgotPasswordnoInternetConnection").popup('open');
	      					window.setTimeout(function() {$("#forgotPasswordnoInternetConnection").popup('close')}, 3000);
					
	   						},
	   			timeout		: 	2000, //2 seconds
				url			:	serviceURL + "forgot_password",	
				type		: 	"post",
				data		:	{email: $('.your_email').val() },
				success		: 	function(data) {
					
							
							if(data == "1") {					
										
									$('.textForgotMsg').empty().append("Instructions have been sent to your email address ("+ $('.your_email').val() +") on how to reset your password");	
										
									
									window.plugins.childBrowser.showWebPage(serviceURL + 'reset_password?email='+ $('.your_email').val() + '', { showLocationBar: true });
									$('.your_email').val("");
									
									} else {
										
										
										$('.your_email').addClass("error");
										
										$("#pwordErrorMsg").popup('open');
										window.setTimeout(function() {$("#pwordErrorMsg").popup('close')}, 3000);
										
									}
									
	
									
				}
			});
			
		}
		
			
		
		});
});

/* Script for login Page*/
$('#loginPage').live("pageshow", function(event){
	
	
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	var domainName = window.localStorage.getItem("domain_name");
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/login/";
	
	$('.log_email').change(function() {
		
		$(this).removeClass("error");
		
	});
	
	$('.log_password').change(function() {
		
		$(this).removeClass("error");
		
	});
	
	
	$('.loginBtn').click(function() {
		
		if($('.log_email').val().length == 0 ) {
			
			$('.log_email').addClass("error");
			
			$("#requiredEmail").popup('open');
			window.setTimeout(function() {$("#requiredEmail").popup('close')}, 3000);
			return false;
			
		} else if(!$('.log_email').val().match(emailExp)) {
			
			$('.log_email').addClass("error");
			$("#invalidEmail").popup('open');
			window.setTimeout(function() {$("#invalidEmail").popup('close')}, 3000);
			return false;
			
		} else if ($('.log_password').val().length == 0) {
			
			$('.log_password').addClass("error");
			$("#requiredPassword").popup('open');
			window.setTimeout(function() {$("#requiredPassword").popup('close')}, 3000);
			return false;
			
		} else {
			
			$('.log_email').removeClass("error");
			$('.log_password').removeClass("error");
			
			$.ajax({
				error		: function (req, status, error) {
				      			if(status == "timeout") 
				 	
				      			$("#loginnoInternetConnection").popup('open');
			        			window.setTimeout(function() {$("#loginnoInternetConnection").popup('close')}, 3000);
								
				   				},
				timeout		: 	2000, //2 seconds
				url			:	serviceURL,	
				type		: 	"post",
				data		:	{email: $('.log_email').val(), pword: $('.log_password').val() },
				success		: 	function(data) {
					
									
									if(data == "1") {
										
					        			
										$.mobile.changePage( "index.html", { transition: "slideup"} );
										$("#loginInfoMsg").popup('open');
										
										window.localStorage.setItem("is_logged_in", "1");
										window.localStorage.setItem("user_email", $('.log_email').val());
										
					        			window.setTimeout(function() {$("#loginErrorMsg").popup('close')}, 1000);
										
										
									} else {
										
										$("#loginErrorMsg").popup('open');
					        			window.setTimeout(function() {$("#loginErrorMsg").popup('close')}, 3000);
										
									}
									

									
								}
			});
			
		}
		
		
	});
	
});

/* Script for Home Page Page*/
$('#homePage').live("pageshow", function(event){
	
	
	var is_logged_id = window.localStorage.getItem("is_logged_in");

	if(is_logged_id == 1) {
		
		categoryPage();
		searchPage();
	
	} else {
		
		$.mobile.changePage( "login.html", { transition: "slideup"} );
		
		}
	
	$('.signoutBtn').click(function() {
		
		
		window.localStorage.removeItem("is_logged_in");
		$.mobile.changePage( "login.html", { transition: "slideup"} );
		
	});
	
});

$(document).live("pageinit", function(event){
	
	 $.mobile.defaultPageTransition="none"
	
	setTimeout(function (){
		
		var domainChecker = window.localStorage.getItem("domain_setup");
		
		if(domainChecker == 1) {
			
			categoryPage();
			searchPage();
			
		} else {
        	
        	$.mobile.changePage( "domain.html", { transition: "slideup"} );
        	
        }
    }, 3000)


});


$('#detailsPage').live("pageshow", function(event){

	
	get_info();
	
    /*Add to Cart Script*/
	
    $('.addCartBtn').click(function() {
    	
    		var message = localStorage.getItem("availability_message");
    		var item_availability = parseInt(localStorage.getItem("item_availability"));
    		var qtyVal = parseInt($('input.qtyForm').val());
    		
    		var regInt =  /^([\d]+[\d]+\b|[\d]+\b)$/;
    		
    		if(message == "null") {

    			$("#messagePopUp").popup('open');
    			return false;

    		} else {
    			
    			if($('input.qtyForm').val().match(regInt)) {
	    			
	    			if(qtyVal == 0) {
	    				
	    				$("#qtyZero").popup('open');
	        			window.setTimeout(function() {$("#qtyZero").popup('close')}, 3000);	
	        			return false;
	    				
	    			} else if(qtyVal <= item_availability) {
	    				
	    			
	    				
	        		//'id'=>'1','name'=>'ian','item_id'=>'0001','qty'=>'5','price'=>'100.00' ||'id'=>'2','name'=>'paul','item_id'=>'0002','qty'=>'3','price'=>'10.00'
	    				
	            	var item = [$('input.item_id').val() + ","+ $('input.item_name_val').val() + ","+ $('input.item_price_val').val() + ","+ $('input.qtyForm').val() + ""];
	            	
	            	var strItem = item.toString();
	            	var items = strItem.split(",");
	            	
	            	setupDB();
	            	addItem(items[0], items[1], items[2], items[3]);
	            	
	            	$("#popupDialog").popup('open');
	            	
	    			} else {
	            		
	        			$("#aCheckMsg").popup('open');
	        			window.setTimeout(function() {$("#aCheckMsg").popup('close')}, 3000);	
	        			return false;
	        			
	            	}
	            	
	    		} else {
	    			
	    			$("#intChecker").popup('open');
	    			window.setTimeout(function() {$("#intChecker").popup('close')}, 3000);	
	    			return false;
	    			
	    		}

    		}
	
    });
   
	
});

$('#orderDetailsPage').live('pageshow',function() {
	
	var getCurrDomain = window.localStorage.getItem("domain_name");
	var order_id = getUrlVars()["order_id"];
	var serviceURL = "http://"+ getCurrDomain +"/MBOOS/mobile_ajax/customer/";
	
	$.getJSON(serviceURL + 'order_summary_details?order_id='+order_id, function(data) {
	
		summary_details = data.summary_details;
		
		dateToBePickUp = data.dateToBePickUp;
		
		$.each(dateToBePickUp, function(index, date) { 
			
			$('#date_ordered').empty().append(date.dateOrderd);
			$('#dateToBePickUp').empty().append(date.datePickUpFormmated);
			
		});
		
		
		$.each(summary_details, function(index, detail) {
			
			var subtotal = parseFloat(detail.mboos_order_detail_price) * parseFloat(detail.mboos_order_detail_quantity);
			$('#order_num').empty().append("000"+detail.mboos_order_id);
			
			
			
			
			$('#summaryList').append('<li>' +
					'<h4>' + detail.mboos_product_name  +'</h4>' + 
					'<p>Item number : 000' + detail.mboos_product_id + '</p>' +
					'<p>Item price : '+detail.mboos_order_detail_price +'</p>' +
					'<p>Quantity : '+detail.mboos_order_detail_quantity+'</p>' +
					'<p class="ui-li-aside"><strong>'+ subtotal +'</strong></p>' +
					'</li>'); 
	
			$("#summaryList").listview("refresh");
			
			$('#overall_total').empty().append(detail.mboos_orders_total_price +" PHP");

			
		});

	});
	
	
	
	
});

/* Script for Registration Page*/
$('#regPage').live("pageshow", function(event){
	
	
	var domainName = window.localStorage.getItem("domain_name");
	
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/register/";
	
	var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
	var strongPword =  /(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/;
	var cnumber = /^(\(\d+\)\s{0,1}){0,1}(\d+((\-|\s){0,1})\d+){0,}$/;
	var alphaExp =  /^[a-zA-Z_\s ]*$/g;
	
	$('.fname').change(function() {
		
		$('.fname').removeClass("error");
		
	});
	
	$('.reg_password').change(function() {
		
		$('.reg_password').removeClass("error");
		
	});
	
	$('.address').change(function() {
		
		$('.address').removeClass("error");
		
	});
	
	$('.cNumber').change(function() {
		
		$('.cNumber').removeClass("error");
		
	});
	
	
	$('#email_addr').change(function() {
		
		
		$.ajax({
			url			:	serviceURL + "email_checker",	
			type		: 	"post",
			data		:	{email: $('#email_addr').val() },
			success		: 	function(data) {
				
								if(data == "1") {					
									
									$("#emailChecker").popup('open');
									window.setTimeout(function() {$("#emailChecker").popup('close')}, 3000);
									$('#email_addr').addClass("error").focus();
									$('.regBtn').attr('disabled','disabled');
									
								} else {
									
									$('.regBtn').removeAttr('disabled');
									$('.email').removeClass("error");
									
								}
								

								
							}
		});
		
		
	});
	
	
	$('.regBtn').click(function() {
		
		//alert($('.fname').val() + "  " + $('#email_addr').val() + " " + $('#reg_password').val() +" " + $('.address').val() + " " + $('.cNumber').val() + " ")
		
		
		if($('.fname').val().length == 0 ) {
			
			$('.fname').addClass("error").focus();

			$("#cnameIsRequired").popup('open');
			window.setTimeout(function() {$("#cnameIsRequired").popup('close')}, 3000);
			return false;
			
		} else if(!$('.fname').val().match(alphaExp)) {
		
			
			$('.fname').addClass("error").focus();
			
			$("#invalidName").popup('open');
			window.setTimeout(function() {$("#invalidName").popup('close')}, 3000);
			return false;
			
		} else if($('#email_addr').val().length == 0 ) {

			$('.fname').removeClass("error");
			$('#email_addr').addClass("error").focus();
			
			$("#emailRequired").popup('open');
			window.setTimeout(function() {$("#emailRequired").popup('close')}, 3000);
			return false;
			
		} else if(!$('#email_addr').val().match(emailExp)) {
			
			$('.fname').removeClass("error");
			$('#email_addr').addClass("error").focus();
			
			$("#emailExistMsg").popup('open');
			window.setTimeout(function() {$("#emailExistMsg").popup('close')}, 3000);
			return false;
			
		} else if($('.reg_password').val().length == 0 ) {
			
			$('#email_addr').removeClass("error");
			$('.reg_password').addClass("error").focus();
			return false;
			
		} else if(!$('.reg_password').val().match(strongPword)) {
			
			$("#passwordTipsMsg").popup('open');
			window.setTimeout(function() {$("#passwordTipsMsg").popup('close')}, 3000);
			
			$('#email_addr').removeClass("error");
			$('.reg_password').addClass("error").focus();
			return false;
			
		} else if($('.address').val().length == 0) {
			
			$('.reg_password').removeClass("error");
			$('.address').addClass("error").focus();
			return false;
			
		} else if($('.cNumber').val().length == 0) {
			
			$('.address').removeClass("error");
			$('.cNumber').addClass("error").focus(); 
			return false;
			
		} else if(!$('.cNumber').val().match(cnumber)) {
			
			$("#invalidNumber").popup('open');
			window.setTimeout(function() {$("#invalidNumber").popup('close')}, 3000);
			
			
			$('.address').removeClass("error");
			$('.cNumber').addClass("error").focus();
			return false;
			
		} else {

			var name = $('.fname').val();
			var addr = $('.address').val();
			var email = $('#email_addr').val();
			var number = $('.cNumber').val();
			var password = $('.reg_password').val();	
			
			var request = $.ajax({
				
					url			: serviceURL,
					type		: "POST",
					data		: { cname: name, address: addr, email: email, cpnumber: number, pword: password },
					dataType	: "html",
					success		: 	function(data) {
										
										
										$("#savingInfoMsg").popup('open');
										window.setTimeout(function() {$("#savingInfoMsg").popup('close')}, 3000);
						
									}
						
			});
			
			request.done(function(msg) {
				
					window.location.href = 'login.html';
					
			});
				
			request.fail(function(jqXHR, textStatus) {
				
				$("#regUnsuccessfulMsg").popup('open');
				window.setTimeout(function() {$("#regUnsuccessfulMsg").popup('close')}, 3000);
					
			});
			
			

			
		}
	});
	
});

/* Script for Category Item Page*/
$('#categoryPage').live("pageshow", function(event){

	
	get_cat_info();
	
});

/* function for Category Page */
function get_cat_info() {
	
	var domainName = window.localStorage.getItem("domain_name");
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/mobile/";
	
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
	
	var domainName = window.localStorage.getItem("domain_name");
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/mobile/";
	
	var id = getUrlVars()["id"];
	
	$.getJSON(serviceURL + 'get_info?id='+id, function(data) {
		
	item_info = data.item_info;
	
	availability = data.availability;
	
		$.each(availability, function(index, available) {
		
			$('li.item_availability').append(available.availability);
			localStorage.setItem('item_availability', available.availability );	
			localStorage.setItem('availability_message', available.message );	
		});
	
		$.each(item_info, function(index, info) {
			
			$('label.item_name').append(info.mboos_product_name);
			$('label.item_price').append("PHP"+info.mboos_product_price);
			$('p.item_image').append('<img src="http://'+ domainName +'/MBOOS/images/item_images/' + info.mboos_product_image + '" height="100" width="100">');
			
			$('p.item_desc').append(info.mboos_product_desc);
			$('input.item_id').val(info.mboos_product_id);
			$('input.item_name_val').val(info.mboos_product_name);
			$('input.item_price_val').val(info.mboos_product_price);
				
			
			});
		
	
	});
	
}    

function categoryPage() {
	
	var domainName = window.localStorage.getItem("domain_name");
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/mobile/";
	
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
	
	var domainName = window.localStorage.getItem("domain_name");
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/mobile/";
	
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

$("#searchPage").live( "click", function(event, ui) {
	
	
});

$("#categoriesPage").live( "click", function(event, ui) {
	
	
});

$(".sRefreshBtn").live( "click", function(event, ui) {
	
	
	$("#sRefreshMsg").popup('open');
	window.setTimeout(function() {$("#sRefreshMsg").popup('close')}, 1000);
	searchPage();
	
	});

$(".cRefreshBtn").live( "click", function(event, ui) {
	
	$.ajax({
		error		: function (req, status, error) {
		      			if(status == "timeout") 
		 	
		      			$("#catnoInternetConnection").popup('open');
	        			window.setTimeout(function() {$("#catnoInternetConnection").popup('close')}, 3000);
						
		   				},
		timeout		: 	2000, //2 seconds
		url			:	"http://mboos.ipklab.dx.am/MBOOS/"
		
	});
	
	$("#cRefreshMsg").popup('open');
	window.setTimeout(function() {$("#cRefreshMsg").popup('close')}, 1000);
	categoryPage();
	
	});

$('#cartPage').live("pageshow", function(event){

	
	setupDB();
	
	$('.cartRefreshBtn').click(function() {
		
		setupDB();
		
		$("#refreshingMsg").popup('open');
		window.setTimeout(function() {$("#refreshingMsg").popup('close')}, 1000);
		
	});
	
	$('.checkoutBtn').click(function() {
		
		var cart_items = localStorage.getItem("cart_items")
		
		if(cart_items == 0) {
			
			$("#cartCheckerMsg").popup('open');
			window.setTimeout(function() {$("#cartCheckerMsg").popup('close')}, 2000);
			return false;	
			
		} else {
			
			return true;
			
		}		
	});
	
});



$('#checkoutPage').live("pageshow", function(event) {
	
	
	var cart_items = localStorage.getItem("cart_items")
	var paypal_account = localStorage.getItem("paypal_email")
	
	$('#paypal_email').val(paypal_account);
	
	if(cart_items == 0) {
		
		$.mobile.changePage( "index.html", { transition: "slideup"} );
		
	} else {
		
		
		$('.paypalBtn').click(function() {
			
			var username = $('#paypal_email').val();
			
			window.localStorage.setItem("paypal_email", username);
			
			var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
			if(username == "") { 
				
				$("#uValidationMsg").popup('open');
				window.setTimeout(function() {$("#uValidationMsg").popup('close')}, 3000);
				return false;
				
			} else if(!username.match(emailExp)) {
				
				$("#invalidPaylpalEmail").popup('open');
				window.setTimeout(function() {$("#invalidPaylpalEmail").popup('close')}, 3000);
				return false;
				
				
			} else {
				
				return true;
				
			}
			
		});
		query_cart();
		
		
	}

	
	
});

$('#profilePage').live("pageshow", function(event) {
	
	
	var currUser = window.localStorage.getItem("user_email");
	var domainName = window.localStorage.getItem("domain_name");
	
	$('#dName').val(domainName);
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/customer/";
	
	$.getJSON(serviceURL + 'customer_info?email='+currUser, function(data) {
	
		cust_info = data.customer_info;
	
		$.each(cust_info, function(index, info) {
			
			
			$('#cName').val(info.mboos_customer_complete_name);
			$('#address').val(info.mboos_customer_addr);
			$('#email').val(info.mboos_customer_email);
			$('#cNumber').val(info.mboos_customer_phone);
			$('.cust_id').val(info.mboos_customer_id);
			
		});

	});
	
	$.getJSON(serviceURL + 'customer_order_summary?currEmail='+currUser, function(data) {
		
		summaries = data.orders_summary;
		
			$.each(summaries, function(index, summary) {
				
				$('#order_summary').append('<li><a class="id_item" href="order_details.html?order_id=' + summary.mboos_order_id + '">' + 
										   '<h4>000' + summary.mboos_order_id +'</h4>' + 
										   '</a></li>');
				
			});
			
			$('#order_summary').listview('refresh');
		});
	
	

	
	$('.profileSaveBtn').click(function() {
		
		var emailExp = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		var strongPword =  /(?!^[0-9]*$)(?!^[a-zA-Z!@#$%^&*()_+=<>?]*$)^([a-zA-Z!@#$%^&*()_+=<>?0-9]{6,15})$/;
		var cnumber = /^(\(\d+\)\s{0,1}){0,1}(\d+((\-|\s){0,1})\d+){0,}$/;
		
		var customer_id = $('.cust_id').val();
		var cname = $('#cName').val();
		var addr = $('#address').val();
		var email = $('#email').val();
		var cnumber = $('#cNumber').val();
		
		if(!email.match(emailExp)) {
			
			$("#cnameEmptyMsg").popup('open');
			window.setTimeout(function() {$("#cnameEmptyMsg").popup('close')}, 3000);
		
			
			
		} else if(email.lenght == 0) {
			
			
			$("#emailIsEmpty").popup('open');
			window.setTimeout(function() {$("#emailIsEmpty").popup('close')}, 3000);
			
			
		} else if(!cnumber.match(cnumber)) {
			
			$("#profilenumberTipsMsg").popup('open');
			window.setTimeout(function() {$("#profilenumberTipsMsg").popup('close')}, 3000);
			
			
		} else {
			
		
			
		var request = $.ajax({
				
				error		: function (req, status, error) {
							if(status == "timeout") 

									$("#profilenoInternetConnection").popup('open');
									window.setTimeout(function() {$("#profilenoInternetConnection").popup('close')}, 3000);
	
						},
			
				url			: serviceURL + "customer_edit",
				type		: "POST",
				data		: {cust_id : customer_id, name : cname, address : addr, email : email, number : cnumber },
				dataType	: "html"
				
			});
		
			request.done(function(msg) {
				
				$("#popupInfo").popup('open');
				window.setTimeout(function() {$("#popupInfo").popup('close')}, 3000);
			
			});
			
			request.fail(function(jqXHR, textStatus) {
				
				$("#enableToUpdateMsg").popup('open');
				window.setTimeout(function() {$("#enableToUpdateMsg").popup('close')}, 3000);
				
				
			});
			
		}
		

		
	});
	
	$('.updatingDomainBtn').click(function() { 
		
		var getCurrDomain = window.localStorage.getItem("domain_name");
		
		var domain_name = $('#dName').val();
		
		window.localStorage.setItem("domain_name", domain_name);
		
		$("#updatingDomainMsg").popup('open');
		window.setTimeout(function() {$("#updatingDomainMsg").popup('close')}, 2000);
	});
});

$('#confirmationPage').live("pageshow", function(event) {

	var getCurrDomain = window.localStorage.getItem("domain_name");
	var getPaypalEmail = window.localStorage.getItem("paypal_email");
	var serviceURL = "http://"+ getCurrDomain +"/MBOOS/mobile_ajax/customer/";
	var datas = localStorage.getItem("all_items");
	var subtotal = window.localStorage.getItem("subtotal");
	var user_email = window.localStorage.getItem("user_email");
	
	var cleanDatas = datas.replace("&","%26");
	
	
	$.getJSON(serviceURL + 'customer_info?email='+user_email, function(data) {
		
		cust_info = data.customer_info;
	
		$.each(cust_info, function(index, info) {
			
			//'id'=>'1','name'=>'ian','item_id'=>'0001','qty'=>'5','price'=>'100.00' ||'id'=>'2','name'=>'paul','item_id'=>'0002','qty'=>'3','price'=>'10.00'&subtotal=100.00&cust_id=1&paypal=ian_kionisala@yahoo.com
			window.plugins.childBrowser.showWebPage('http://'+ getCurrDomain +'/MBOOS/paypal/paypal?stringOrder='+ cleanDatas +'&subtotal='+ subtotal +'&cust_id='+ info.mboos_customer_id +'&paypal_email='+ getPaypalEmail +'', { showLocationBar: true });
			
		});

	});
	
	$('a.clearCartBtn').click(function() {
		
		emptyDB();
		$.mobile.changePage( "index.html", { transition: "slideup"} );
		
	});
	
	
	$('a.backToCartBtn').click(function() {
		
		$.mobile.changePage( "cart.html", { transition: "slideup"} );
		
	});
	
	
	
		
		
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
		
		order = ["||'item_id' => '" + results.rows.item(i).item_id + "'", "'name' => '"+ results.rows.item(i).item_name  +"'", "'price' => '"+ results.rows.item(i).item_price +"'", "'qty' => '" + results.rows.item(i).item_qty + "'"]
		
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
	
	$("#numItems").empty().append(len);
	$('#cart_data').empty();
	
	for (var i=0; i<len; i++){
		
			$('#cart_data').append('<li><a class="cart_edit_item" href="cart_edit_item.html?id=' + results.rows.item(i).id + '&item_id='+ results.rows.item(i).item_id  +'">' +
							'<h4>' + results.rows.item(i).item_name  +'</h4>' + 
							'<p>PHP ' + results.rows.item(i).item_price + '</p>' +
							'<a class="deleteBtn" href="item_delete.html?id=' + results.rows.item(i).id + '" data-role="button" data-icon="delete" data-iconpos="notext">Delete</a> ' +
							'</a><span class="ui-li-count">'+ results.rows.item(i).item_qty +'</span></li>'); 
			
			$("#cart_data").listview("refresh");
			
	    }

    
}

function querySubTotalSuccess(tx, results) {
	
	if(results.rows.item(0).itemSubtotal == null) {
		
		$('#subtotalVal').empty().append("PHP 0.00");
		
	} else {
		
		var num = results.rows.item(0).itemSubtotal;
		var result = Math.round(num*100)/100;
		
		// saving the subtotal
		localStorage.setItem('subtotal', result);
		
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

//PhoneGap is ready
function createDB() {
	
    var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
    db.transaction(populateDB, errorCB);
    
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
	
	var id = getUrlVars()["id"];
	
	del_table(id);
	
} 


function del_table(id) {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
	
		tx.executeSql('DELETE FROM CART WHERE id ="' + id + '"');
	
	}, dbErrorHandler);
}

$('#editPage').live("pageshow", function(event){

	
	var domainName = window.localStorage.getItem("domain_name");
	
	var serviceURL = "http://"+ domainName +"/MBOOS/mobile_ajax/mobile/";
	
	var id = getUrlVars()["id"];
	var item_id = getUrlVars()["item_id"];
	
	select_table(id);
	
	$.getJSON(serviceURL + 'get_info?id='+item_id, function(data) {
		
		item_info = data.item_info;
		
		availability = data.availability;
		
		$.each(availability, function(index, available) {
		
			$('.item_available').append(available.availability);
			$('.item_available_hidden').val(available.availability);
		});
			
		
		});
	
	$('.saveBtn').click(function() {
	    	
	    	var tempItem_availability = parseInt($('.item_available_hidden').val());
	    	var qtyVal = parseInt($('input.qtyForm').val());
	    	
    		var regInt =  /^([\d]+[\d]+\b|[\d]+\b)$/;
    		
    		if(qtyVal == 0) {
    			
    			
    			$("#qtyMustNotZero").popup('open');
	    		window.setTimeout(function() {$("#qtyMustNotZero").popup('close')}, 2000);	
	    		return false;
    			
    		} else {
    			
    			if($('input.qtyForm').val().match(regInt)) {
    			   	
    		    	if(qtyVal <= tempItem_availability) {
    		    		
    			        	var name = $('.item_name_val').val();
    			        	var price = $('.item_price_val').val();
    			        	var qty = $('.qtyForm').val();
    			        	var cart_id = $('.cart_id').val();
    			        	var item_id = $('.item_id').val();
    			        	var total_price = qty * price;
    			        	
    			        	update_table(cart_id,qty, total_price);
    		
    			        	
    			    	} else {
    			    		
    			    		$("#cartEditMsg").popup('open');
    			    		window.setTimeout(function() {$("#cartEditMsg").popup('close')}, 2000);	
    			    		return false;
    			    		
    			    	} 
        		} else {
    	    		
        			
        			$("#qtyChecker").popup('open');
        			window.setTimeout(function() {$("#qtyChecker").popup('close')}, 3000);	
        			return false;
    	    	
    	    	}
    			
    		}
    		
		
	    });
	
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


function update_table(id, qty, ttl_price) {
	
	var db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
	db.transaction(function(tx) {
		//item_id, item_name, item_price, item_qty
		tx.executeSql('UPDATE CART SET item_qty='+ qty +', price_total='+ ttl_price +' WHERE id="'+ id +'"', [], errorCB);
	
	}, dbErrorHandler);
}




/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
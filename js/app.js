$(document).bind("mobileinit", function () {
    $.mobile.pushStateEnabled = true;
});


 var viewPHeight=$( window ).height();
// alert(viewPHeight+''+'px');
 //$("#home").css('height',viewPHeight+''+'px');
 $('#menu').bind('touchmove', function(e){e.preventDefault()});
 //$("#menu").css('top','0px');
$(function () {
	
// $("#homeList").css('height',viewPHeight+''+'px');
 var geoH=viewPHeight-10;
 $("#menu2").css('height',geoH+''+'px');
    var menuStatus=false;
    var show = function() {
			if(menuStatus) {
				return;
			}
			//alert("show--"+menuStatus);
			$('#menu').show();
			$("#menu2").hide();
			//$( "#sort_Channel" ).selectmenu( "enable" );
			$.mobile.activePage.animate({   left: "210px",  }, 300, function () { 
				menuStatus = true;
				$('body').bind('touchmove', function(e){e.preventDefault()});
				$('body').bind('touchmove', function(e){e.preventDefault()});
				});
			
    };
	
    var hide = function() {
	        if(!menuStatus) {
				return;
			}
			$('#menu').hide();
			menuStatus = false; 
            $.mobile.activePage.animate({ left: "0px", }, 300, function () { 
			$('body').unbind('touchmove');
		
		});
	};
    var toggle = function() {
    	//alert(menuStatus);
	        if (!menuStatus) {
				show();
			} else {
				hide();
			}
			return false;
		};
		
		var showGeo=function(){
			//$.mobile.activePage.animate({ left: "120px", }, 300, function () { });
			hide();
			$("#menu2").show();
			//$( "#sort_Channel" ).selectmenu( "disable" );
			//$('#menu2').bind('swiperight', function(e){e.preventDefault()});
			//$('#menu2').bind('swipeleft', function(e){e.preventDefault()});
			//$('#home').bind('touchmove', function(e){e.preventDefault()});
		};
		var hideGeo=function(){
			//$.mobile.activePage.animate({ left: "0px", }, 300, function () { });
			$("#menu2").hide();
			$( "#sort_Channel" ).selectmenu( "enable" );
		};
		
//	$('#home').live("swiperight", showGeo);
  //  $('#home').live("swipeleft", hideGeo);
//    $('#home').live("swipe", hideGeo);
   // $('div[data-role="page"]').live("swipeleft", hideGeo);
   // $("#slideUl").parent().scrollTop($("#slideUl").offset().top - 5);
		
	
  document.addEventListener ("menubutton",toggle,false);
  //  $("#menu").click(toggle);
    $("#menuContent").click(hide);
    $("a.showMenu").click(toggle);
    $('div[data-role="page"]').click(function(){
		//alert('div[data-role="page"] click'+menuStatus+'');
		if(menuStatus){
			hide();
		} });
  $('#menu, .pages').live("swipeleft", hide);
  $('.pages').live("swiperight", show);

//  document.addEventListener("backbutton", function(e)	{
//               		if(menuStatus==true){
//               			hide();
//               		}
//               	else{
//	      				if($.mobile.activePage.is('#home')){
//	            			     navigator.app.exitApp(); // Exit app if current page is a home page
//	   						 }
//	   				   else if($.mobile.activePage.is('#login')){
//	   						 	//return;
//	   						 }
//	 				   else {
//	   					     navigator.app.backHistory(); // Go back in history in any other case
//	   						}
//   						
//   				}
//		}, false);
//  
  
 
   	 $('div[data-role="page"]').live('pagebeforeshow', function (event, ui) {
		 $.mobile.activePage.animate({ left: "0px", }, 600, function () { menuStatus = false });
		//toggle();
     });
 

    // Menu behaviour
  //  $("#menu li a").click(function () {
//        var p = $(this).parent();
//        p.siblings().removeClass('activeli');
//        p.addClass('activeli');
//    });
    
});

 

/////////////////////////************* Vishal code **************////////////////////////////////////////
var loginstatus=0;

var truckInfo = {
heading: "",
stockRef:"",
enquiryPhone:"",
type:"",
make:"",
model:"",
stockLocation:"",
catagory:"",
catagoryId:"",
subCatagory:"",
subCatagoryId:"",
addCatagory:"",
addCatagoryId:"",
year:"",
price:"",
gst:"",
enqPhone:"",
gvm:"",
trans:"",
diffs:"",
diff_Ratio:"",
suspension:"",
fuel_Type:"",
Fuel_Capacity:"",
brakes:"",
color:"",
description:"",
listId:"",
camera:"",
detailsAddListing:"",
dropdown_Check:"0"
}




$(document).ready(function(){
                  $('#forgot').click(function(){
                                     $.mobile.changePage("#pageForgot", {transition:"none"})
                                     });
                  });

function navRegister(action){
    window.localStorage.setItem("register_Action",action)
    $.mobile.changePage("#pageRegister", {transition:"none"})
}

function navDashboard()
{
    // alert('navDashboard');
    //  $("#h1dashboard").empty();
    //  $("#h1dashboard").append('DASHBOARD');
    
    if(loginstatus == 0 || loginstatus == undefined)
    {
        navigator.notification.confirm('Please sign in to view dashboard', // message
                                       function(buttonIndex)
                                       {
                                       if(buttonIndex==1){
                                       $.mobile.changePage("#pageLogin", {transition:"none"})
                                       }
                                       else
                                       {
                                       return;
                                       }
                                       // alert('You selected button ' + buttonIndex);
                                       },            // callback to invoke with index of button pressed
                                       'TDA',           // title
                                       ['Login','Cancel']     // buttonLabels
                                       );
        
    }
    else
    {
        $.mobile.changePage("#pageDashboard", {transition:"none"})
        
    }
    $( "#panelSearch" ).panel( "close" );
    //   $( "#panelDashboard" ).panel( "toggle" );
}
function navSearch(){
    //   alert('navSearch');
    $.mobile.changePage("#pageSearchScreen", {transition:"none"})
    $( "#panelSearch" ).panel( "close" );
    //  $( "#panelSearchLogin" ).panel( "close" );
}

function navFind(){
    //   alert('navFind');
    $.mobile.changePage("#pageFindScreen", {transition:"none"})
    // $( "#panelFind" ).panel( "toggle" );
}

function navMylist(){
    // alert('navMylist');
    //   $("#h1dashboard").empty();
    // $("#h1dashboard").append('YOUR LISTINGS');
    $.mobile.changePage("#pageMyListing", {transition:"none"})
    $( "#panelDashboard" ).panel( "close" );
}





function searchResult(){
	$.mobile.changePage("#pageSearchResult", {transition:"none"})
}
function navSorting()
{
    $.mobile.changePage("#pageSorting", {transition:"none"})
}

function productDetail()
{
    $.mobile.changePage("#pageProductDetails", {transition:"none"})
}

function navLogin(){
    $.mobile.changePage("#pageLogin", {transition:"none"})
    $( "#panelLoginLogin" ).panel( "close" );
}

function navCheckLogin()
{
    if(loginstatus==0)
    {
        $.mobile.changePage("#pageLogin", {transition:"none"})
    }
    else
    {
        $('body').find('.addNew').each(function()
                                       {
                                       $(this).html('ADD NEW LISTING');
                                       });
        $('#add_Heading').val("");
        $('#add_Stock').val("");
        $('#add_year').val("");
        $('#add_price').val("");
        $('#add_enqPhone').val("");
        $('#add_Gvm').val("");
        $('#add_Transmission').val("");
        $('#add_Diffs').val("");
        $('#add_Diff_Ratio').val("");
        $('#add_Suspen').val("");
        $('#add_Fuel_Type').val("");
        $('#add_Fuel_Capacity').val("");
        $('#add_Brakes').val("");
        $('#add_color').val("");
        $('#add_description').val("");
        $('#add_ThreeCategory').val("");
        $('#radio-choice-0a').attr('checked', false).checkboxradio("refresh");
        $('#radio-choice-0b').attr('checked', false).checkboxradio("refresh");
        if(truckInfo.dropdown_Check=="1")
        {
            $('#add_Type').val("");
            $('#add_Type').selectmenu('refresh', true);
            $('#addStock').val("");
            $('#addStock').selectmenu('refresh', true);
            $('#add_Make').val("");
            $('#add_Make').selectmenu('refresh', true);
            $('#add_Model').val("");
            $('#add_Model').selectmenu('refresh', true);
            $('#add_Category').val("");
            $('#add_Category').selectmenu('refresh', true);
            $('#add_SubCategory').val("");
            $('#add_SubCategory').selectmenu('refresh', true);
            $('#add_ThreeCategory').val("");
            $('#add_ThreeCategory').selectmenu('refresh', true);
        }
        
        
        
        truckInfo.detailsAddListing=0;
        $.mobile.changePage("#pageAddNewStep1", {transition:"none"});
    }
    
}

function navLogout(page,panel)
{
    var facebook_LogoutData = {
        "action": "logout",
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType":device.Type,
    }
    console.log(JSON.stringify(facebook_LogoutData));
    
    facebook_LogoutData=JSON.stringify(facebook_LogoutData);
    service.ajaxCall(facebook_LogoutData,
                     function(result_data){
                     if(result_data.responseCode==200)
                     {
                     loginstatus=0;
                     facebookConnectPlugin.logout(
                                                  function (response) { //alert(JSON.stringify(response))
                                                  },
                                                  function (response) { //alert(JSON.stringify(response))
                                                  });
                     localStorage.clear();
                     $.mobile.changePage("#pageSearchScreen", {transition:"none"})
                     }
                     else if(result_data.responseCode==0)
                     {
                     navigator.notification.alert(Password,notifySuccess,'TDA','OK');
                     }
                     },
                     function(result_data)
                     {
                     //alert(JSON.stringify(result_data));
                     console.log(JSON.stringify(result_data));
                     });
    if($.mobile.activePage.attr("id")==page){
        $('#'+panel).panel("close");
    }
}

function dealerSignup(){
    $.mobile.changePage("#pageDealerSignup", {transition:"none"})
}

function navChangePass()
{
    $.mobile.changePage("#pageChangepass", {transition:"none"})
}

function navDealerResult()
{
    $.mobile.changePage("#pageDealerResult", {transition:"none"})
}

function navDealerInfo()
{
    var myOptions = {
    zoom: 10,
    center: new google.maps.LatLng(28.6139, 77.2089),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
    };
    
    
    var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
    
    var marker1= new google.maps.Marker({
                                        
                                        position: new google.maps.LatLng(28.6139, 77.2089),
                                        map: mapObject,
                                        title: "This is a marker!",
                                        animation: google.maps.Animation.DROP
                                        
                                        });
    
    $.mobile.changePage("#pageDealerInfo", {transition:"none"})
}

function navAddStep3()
{
    $.mobile.changePage("#pageAddNewStep3", {transition:"none"})
}

function navFavourit()
{
    $.mobile.changePage("#pageFavourite", {transition:"none"})
    
    $( "#panelFavourite" ).panel( "close" );
    favoriteList();
}

function navNotification()
{
    if(loginstatus == 0 || loginstatus == undefined)
    {
        navigator.notification.confirm('Please sign in to view notifications', // message
                                       function(buttonIndex) {
                                       if(buttonIndex==1){
                                       $.mobile.changePage("#pageLogin", {transition:"none"})
                                       }else
                                       {
                                       return;
                                       }
                                       // alert('You selected button ' + buttonIndex);
                                       },            // callback to invoke with index of button pressed
                                       'TDA',           // title
                                       ['Login','Cancel']     // buttonLabels
                                       );
    }
    else
    {
        getListofNotifactn();
    }
    // $.mobile.changePage("#pageNotification", {transition:"none"})
    
    $( "#panelNotification" ).panel( "close" );
}

function navNotifiSetting()
{
    getNotif_Status();
    //$.mobile.changePage("#pageNotifySetting", {transition:"none"})
    $( "#panelNotifySetting" ).panel( "close" );
}

function navPayment()
{
    if(user.Type=="Registered"){
        $.mobile.changePage("#pagePayment", {transition:"none"})
    }
    else
    {
        $.mobile.changePage("#pageDashboard", {transition:"none"})
    }
}

function navAuction()
{
    $.mobile.changePage("#pageAuction", {transition:"none"})
    $( "#panelAuction" ).panel( "close" );
}

function navSaveSearch(){
    displaySavedSearches_AU();
    
}

function navAccountInfo()
{
    $.mobile.changePage("#pageAccountInfo", {transition:"none"})
    $( "#panelAcntInfo" ).panel( "close" );
    setTimeout(function()
               {
               getUserInformation();
               },500);
}

function validatepageChangepass(){
	var Password=validate.Password({id:oldPass_pageChangepass});
    //	if(Password!=true){
    //		navigator.notification.alert(Password,notifySuccess,'TDA','OK');
    //        return;
    //	}
	var newPassword=validate.NewPassword({id:newpass_pageChangepass});
	if(newPassword!=true){
		navigator.notification.alert(newPassword,notifySuccess,'TDA','OK');
 		return;
	}
	var pass=newpass_pageChangepass.value;
    var oldPass = oldPass_pageChangepass.value;
	var confPass=confNewPass_pageChangepass.value;
	var result=pass.localeCompare(confPass);
	if(result!=0){
		navigator.notification.alert('New password and Confirm Password did not match.',notifySuccess,'TDA','OK');
        return;
	}
	else
    {
        var updateInfoData = {
            "action": "updatePassword",
            "userID": user.Id,
            "deviceID": device.Id,
            "deviceType": device.Type,
            "oldPassword": oldPass,
            "newPassword": confPass,
            "is_facebookUser":user.is_Facebook
        }
        
        console.log(JSON.stringify(updateInfoData));
        updateInfoData = JSON.stringify(updateInfoData);
        
        service.ajaxCall(updateInfoData,
                         function(result_data)
                         {
                         if(result_data.responseCode==200)
                         {
                         console.log(JSON.stringify(result_data));
                         navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                         $("#oldPass_pageChangepass").val("");
                         $("#newpass_pageChangepass").val("");
                         $("#confNewPass_pageChangepass").val("");
                         navDashboard();
                         }
                         else if(result_data.responseCode==0)
                         {
                         console.log(JSON.stringify(result_data));
                         navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                         }
                         
                         },
                         function(result_data)
                         {
                         console.log(JSON.stringify(result_data));
                         });
	}
}

function validateMail()
{
	var userEmail=validate.EmailValidation({id:email_ForgetPassword});
	if(userEmail!=true)
    {
		navigator.notification.alert(userEmail,notifySuccess,'TDA','OK');
 		return;
	}
	else
    {
		navLogin();
	}
}

function notifySuccess()
{
}

//////////////////////////// Login and Logout Panel //////////////////////////////////

function panel_Open(panelId)
{
    if(loginstatus==0){
        
        $('#'+panelId+'Login').panel("toggle");
    }
    else{
        $('#'+panelId ).panel( "toggle" );
    }
}

///////////////////////////////////////////////////////////// Camera ///////////////////////////////////////////////

//function truckImages(){
//	navigator.camera.getPicture(cameraSuccess,cameraError,{
//                                quality:50 ,
//                                destinationType:Camera.DestinationType.FILE_URI,
//                                // sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
//                                encodingType: Camera.EncodingType.PNG,
//                                saveToPhotoAlbum:true,
//    });
//}
//
//    function cameraSuccess(imageuri){
//        var cameraimage = document.getElementById('myImage');
//        // var image2= document.getElementById('smallImage');
//        cameraimage.src = imageuri;
//        /// image2.src = imageuri;
//        
//    } 
//    
//    function cameraError(message) {
//        console.log('Failed because: ' + message);
//    }

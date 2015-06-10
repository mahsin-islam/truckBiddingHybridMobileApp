/**************************************************************************************************************************************************
 Purpose: Global Variable.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

// FUNCTION TO SET THE FOOTER (Ameed )
  document.write( '<style>#footer{visibility:hidden}@media(min-height:' + ($( window ).height() - 10) + 'px){#footer{visibility:visible}}</style>' );





//GLOBAL VARIABLE TO STORE UNREAD NOTIFICATIONS

var unread_notif;

var device={
    Id:"",
    Type:"",
    latitude:"",
    longitude:"",
}

var user = {
    Id:"",
    Name:"",
    Email:"",
    Type:"",
    is_Facebook:"",
}

$(document).on("pageshow","#pageLogin", function()
{
        $("#UserName").val("");
        $("#passwordInput").val("");
});
$(document).on("pageshow","#pageRegister", function()
{
        $("#email_PageRegister").val("");
        $("#password_PageRegister").val("");
        $("#confPassword_PageRegister").val("");
});
$(document).on("pageshow","#pageDealerSignup", function()
{
        $("#dealer_Name").val("");
        $("#dealer_SalesName").val("");
        $("#dealer_Phone").val("");
        $("#dealer_SalesPhone").val("");
        $("#dealer_Email").val("");
        $("#dealer_SalesEmail").val("");
});
$(document).on("pageshow","#pageChangepass", function()
{
        $("#oldPass_pageChangepass").val("");
        $("#newpass_pageChangepass").val("");
        $("#confNewPass_pageChangepass").val("");
});
$(document).on("pageshow","#pageForgot", function()
{
        $("#forget_email").val("");
});



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady()
{
    //alert('dr');
   getdevicetoken();
    // for get user location
    var onSuccess = function(position) {
        console.log('Latitude: '          + position.coords.latitude          + '\n' +
                    'Longitude: '         + position.coords.longitude         + '\n' +
                    'Altitude: '          + position.coords.altitude          + '\n' +
                    'Accuracy: '          + position.coords.accuracy          + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                    'Heading: '           + position.coords.heading           + '\n' +
                    'Speed: '             + position.coords.speed             + '\n' +
                    'Timestamp: '         + position.timestamp                + '\n');
        device.latitude=position.coords.latitude;
        device.longitude=position.coords.longitude;
    }
    function onError(error)
    {
        console.log('code: '    + error.code    + '\n' +
                    'message: ' + error.message + '\n');
    }
    
    try
    {
        navigator.geolocation.watchPosition(onSuccess, onError);
    }
    catch(e)
    {
     //alert("Location : "+e);
    }
    
    //////// category
    var getcatg1_Json={"action":"getCategory"};
    getcatg1_Json=JSON.stringify(getcatg1_Json);
    console.log('getcatg1_Json -- '+getcatg1_Json);
    service.ajaxCall(getcatg1_Json,function(result_data){
                     try
                     {
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                     {
                     $('#add_Category').empty();
                     $('#add_Category').append('<option disabled selected style="display:none;" value="-5">Category</option>');
                     $.each(result_data.category, function(idx, obj)
                            {
                            $('#add_Category').append('<option value="'+idx+'">'+obj+'</option>');
                            });
                     cateValue=true;
                     }
                     $('#add_Category').selectmenu('refresh');
                     //alert('hiiihello')
                     }
                     catch(ex)
                     {
                     //alert('catch '+JSON.stringify(ex));
                     }
                     },
                     function(result_data)
                     {
                     //    navigator.notification.alert(result_data.responseMessage, function(){},'Truck Sales','OK');
                     });
    
    ////// type
    var typeData=
    {
        "action": "getType",
    }
    console.log(JSON.stringify(typeData));
    typeData = JSON.stringify(typeData);
    service.ajaxCall(typeData,
                     function(result_data)                                 // Success Callback function
                     {
                     if(result_data.responseCode==200)
                     {
                     
                     $('#add_Type').empty();
                     $('#add_Type').append('<option value="">Type</option>');
                     $.each(result_data.category, function(idx, obj)
                            {
                            $('#add_Type').append('<option value="'+idx+'">'+obj+'</option>');
                            });
                     typeValue=true;
                     console.log('vishal     '+JSON.stringify(result_data));
                     }
                     else if(result_data.responseCode==0)
                     {
                     console.log(JSON.stringify(result_data));
                     }
                     },
                     function(result_data)                                 // Error Callback function
                     {
                     console.log(JSON.stringify(result_data));
                     });
    
    
    //////////////////// make
    
    var getmake_Json={"action":"getMake"};
    getmake_Json=JSON.stringify(getmake_Json);
    console.log('getmake_Json -- '+getmake_Json);
    service.ajaxCall(getmake_Json,function(result_data){
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'Makes Fetched successfully.')
                     {
                     $('#add_Make').empty();
                     $('#add_Make').append('<option value="">Make</option>');
                     for(var i=0;i<result_data.Makes.length;i++)
                     {
                     $('#add_Make').append('<option value="'+result_data.Makes[i].id+'">'+result_data.Makes[i].name+'</option>');
                     }
                     makeValue=true;
                     }
                     else
                     {
                     $('#add_Make').empty();
                     $('#add_Make').append('<option value="">Select a make</option>');
                     }
                     $('#add_Make').selectmenu('refresh');
                     },
                     function(result_data)
                     {
                     navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                     });
    
    
    
    
    
    
}


////////////////////////////////////////////////////////////// Global variable finish ////////////////////////////////////////////////////////////


/**************************************************************************************************************************************************
 Purpose: Check Access Token for Facebook login functionality integration.
 Author: Vishal Jain
**************************************************************************************************************************************************/

//function CheckFB()
//{
//    device.Type = device.platform;
//    //device.Id = device.uuid;
//    if(window.localStorage.getItem("keepMeSignIn")==1)
//    {
//        device.Type = device.platform;
//       // device.Id = device.uuid;
//        getAccessToken();
//    }
//    else{
//    }
    function CheckFB()
    {
        device.Type = device.platform;
        // device.Id = device.uuid;
        if(window.localStorage.getItem("keepMeSignIn")==1)
        {
            device.Type = device.platform;
            // device.Id = device.uuid;
            //  getAccessToken();
        }
        else if(window.localStorage.getItem("keepMeSignIn")==2)
        {
            valid.username = localStorage.getItem("EmailID");
            valid.passwd = localStorage.getItem("Password")
            var loginData={
                "action": "login",
                "userName": valid.username,
                "password": valid.passwd ,
                "deviceID": device.Id ,
                "deviceType": device.Type
            }
            console.log(JSON.stringify(loginData));
            loginData = JSON.stringify(loginData);
            
            service.ajaxCall(loginData,
                             function(result_data)
                             {
                             if(result_data.responseCode==200)
                             {
                             unread_notif=result_data.userInfo.NotificationCount_unreaded;
                             console.log(result_data.responseMessage);
                             user.Id=result_data.userInfo.userID;
                             user.Type=result_data.userInfo.userType;
                             window.localStorage.setItem("userId", result_data.userInfo.userID);
                             window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                             loginstatus=1;
                             $("#UserName").val("");
                             $("#passwordInput").val("");
                             user.is_Facebook=result_data.userInfo.is_facebookUser;
                             window.localStorage.setItem("EmailID",valid.username);
                             window.localStorage.setItem("Password",valid.passwd);
                             window.localStorage.setItem("keepMeSignIn","2");
                             $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                             $('body').find('.notifycount').each(function()
                                                                 {
                                                                 $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                                                 });
                             $('body').find('.favcount').each(function()
                                                              {
                                                              $(this).html(result_data.userInfo.FavCount);
                                                              });
                             }
                             else if(result_data.responseCode==0)
                             {
                             console.log(JSON.stringify(result_data));
                             navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                             }
                             
                             },
                             function(result_data)
                             {
                             //alert(JSON.stringify(result_data));
                             console.log(JSON.stringify(result_data));
                             });
        }
        else
        {
        }
    }
//}

/**************************************************************************************************************************************************
 Purpose: Facebook login functionality integration.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

$(document).on("click","#facebook",function()
{
        device.Type = device.platform;
       // device.Id = device.uuid;
        getAccessToken();
});


var getAccessToken = function ()
{
    facebookConnectPlugin.getAccessToken(
            function (response)
            {
                console.log("acesstoken "+JSON.stringify(response));
                if(response=='null' || response=='undefined' || response=='')
                {
                    console.log("1 -"+JSON.stringify(response));
                    loginab();
                }
                else
                {
                    getmyFbinfo();
                }
            },
            function (response)
            {
                console.log(JSON.stringify(response));
                loginab();
            }
    );
}

///// Facebook Login if Access Token are not Get. //////

var loginab = function ()
{
    if (!window.cordova)
    {
        var appId = prompt("342605625942507", "");
        facebookConnectPlugin.browserInit(appId);
    }
    else{
    }
    facebookConnectPlugin.login( ["email"],
                                function (response){                                       //Success callback function.
								console.log("3.x 1 "+JSON.stringify(response));
								facebook.accToken=response.authResponse.accessToken;
								getmyFbinfo();
                                },
                                function (response) {                                       //Error callback function.
                                });
}


/**************************************************************************************************************************************************
 Purpose: After Facebook login then login to Truck Sales App by Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

var getmyFbinfo = function (){
    facebookConnectPlugin.api( "/me?fields=name,last_name,first_name,id,picture,email",[],
                              function (response){														//Success callback function.
                              //alert("3.x 1 fb info"+JSON.stringify(response));
                              console.log("3.x 1 fb info"+JSON.stringify(response));
                              var facebookData = {
                                    "action": "signupFacebook",
                                    "face_book_id": response.id,
                                    "latitude": "-34.79016",
                                    "longitude": "138.616595",
                                    "deviceID": device.Id,
                                    "deviceType":device.Type,
                                    "emailID": response.email,
                                    "userName": response.email,
                                    "name": response.first_name+" "+response.last_name,
                              }
                              
                              if(facebookData.emailID=="" || facebookData.emailID==undefined)
                              {
                                  facebookData.emailID='vishal369jain@gmail.com';
                                  facebookData.userName='vishal369jain@gmail.com';
                              }
                              console.log("logindata : "+facebookData);
                              console.log('VISHAL  '+JSON.stringify(facebookData));
                              facebookData=JSON.stringify(facebookData);
                              
                              service.ajaxCall(facebookData,
                                    function(result_data){
                                        if(result_data.responseCode==200)
                                        {
                                            unread_notif=result_data.userInfo.NotificationCount_unreaded
                                               
                                               
                                            user.Id=result_data.userInfo.userID;
                                            user.Type=result_data.userInfo.userType;
                                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                                            window.localStorage.setItem("keepMeSignIn","1");
                                            loginstatus=1;
                                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                                            $('body').find('.notifycount').each(function(){
                                                $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                            });
                                            $('body').find('.favcount').each(function(){
                                                $(this).html(result_data.userInfo.FavCount);
                                            });
                                            $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                                        }
                                        else if(result_data.responseCode==201)
                                        {
                                           unread_notif=result_data.userInfo.NotificationCount_unreaded
                                               
                                            user.Id=result_data.userInfo.userID;
                                            user.Type=result_data.userInfo.userType;
                                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                                            window.localStorage.setItem("keepMeSignIn","1");
                                            loginstatus=1;
                                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                                            $('body').find('.notifycount').each(function(){
                                                $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                            });
                                            $('body').find('.favcount').each(function(){
                                                $(this).html(result_data.userInfo.FavCount);
                                            });
                                            $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                                        }
                                        else if(result_data.responseCode==202)
                                        {
                                           unread_notif=result_data.userInfo.NotificationCount_unreaded
                                               
                                            user.Id=result_data.userInfo.userID;
                                            user.Type=result_data.userInfo.userType;
                                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                                            window.localStorage.setItem("keepMeSignIn","1");
                                            loginstatus=1;
                                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                                            $('body').find('.notifycount').each(function(){
                                                $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                            });
                                            $('body').find('.favcount').each(function(){
                                                $(this).html(result_data.userInfo.FavCount);
                                            });
                                            $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                                        }
                                        else if(result_data.responseCode==0)
                                        {
                                            unread_notif=result_data.userInfo.NotificationCount_unreaded
                                               
                                            user.Id=result_data.userInfo.userID;
                                            user.Type=result_data.userInfo.userType;
                                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                                            window.localStorage.setItem("keepMeSignIn","1");
                                            loginstatus=1;
                                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                                            $('body').find('.notifycount').each(function(){
                                                $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                            });
                                            $('body').find('.favcount').each(function(){
                                                $(this).html(result_data.userInfo.FavCount);
                                            });
                                            $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                                        }
                                        
                                    },
                                    function(result_data)
                                    {
                                        //alert(JSON.stringify(result_data));
                                        console.log(JSON.stringify(result_data));
                                    });
                              },
                              function (response){
                                    console.log("3.x  "+JSON.stringify(response))
                              });
}

////////////////////////////////////////////////////////////// Facebook login finish ////////////////////////////////////////////////////////////


/**************************************************************************************************************************************************
 Purpose: Simple login Using Username/Email and password in Truck Sales App by Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function addStep1()
{
    var userName=validate.EmailValidation({id:UserName});
	if(userName!=true)
    {
		navigator.notification.alert(userName,notifySuccess,'TDA','OK');
        return;
	}
	var Password=validate.Password({id:passwordInput});
	if(Password!=true)
    {
		navigator.notification.alert(Password,notifySuccess,'TDA','OK');
        return;
	}
	else
    {
        var loginData={
                        "action": "login",
                        "userName": valid.username,
                        "password": valid.passwd,
                        "deviceID": device.Id ,
                        "deviceType": device.Type
        }
        console.log(JSON.stringify(loginData));
        loginData = JSON.stringify(loginData);
        
        service.ajaxCall(loginData,
                    function(result_data)
                    {
                        if(result_data.responseCode==200)
                        {
                            unread_notif=result_data.userInfo.NotificationCount_unreaded;
                         
                            console.log(result_data.responseMessage);
                            user.Id=result_data.userInfo.userID;
                            user.Type=result_data.userInfo.userType;
                            window.localStorage.setItem("EmailID",valid.username);
                            window.localStorage.setItem("Password",valid.passwd);
                            window.localStorage.setItem("keepMeSignIn","2");
                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                            loginstatus=1;
                            $("#UserName").val("");
                            $("#passwordInput").val("");
                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                            $.mobile.changePage("#pageSearchScreen", {transition:"none"});
                            $('body').find('.notifycount').each(function(){
                                $(this).html(result_data.userInfo.NotificationCount_unreaded);
                            });
                            $('body').find('.favcount').each(function(){
                                $(this).html(result_data.userInfo.FavCount);
                            });
                        }
                        else if(result_data.responseCode==0)
                        {
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        }
                         
                    },
                    function(result_data)
                    {
                         //alert(JSON.stringify(result_data));
                         console.log(JSON.stringify(result_data));
                    });
    }
}

////////////////////////////////////////////////////////////// Simple login finish ////////////////////////////////////////////////////////////



/**************************************************************************************************************************************************
 Purpose: Add to favorite  Truck Sales App by Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function addFavorite(truckID,successCall, errorCall){
    var favoriteData={
        "action":"addFavourite",
        "userID": user.Id,
        "deviceID":device.Id,
        "deviceType":device.Type,
        "truckID":truckID
    };
    
    console.log(JSON.stringify(favoriteData));
    
    favoriteData = JSON.stringify(favoriteData);
    service.ajaxCall(favoriteData,
                     function(result_data){
                     
                        console.log("addfav  "+result_data)
                            $('body').find('.favcount').each(function(){
                                        $(this).html(result_data.totalFavourites);
                            });
                            successCall(result_data)
                                         },
                     function(result_data){
                                errorCall();
                                //alert(JSON.stringify(result_data));
                                console.log(JSON.stringify(result_data));
                     });
}


////////////////////////////////////////////////////////////// Add to favorite finish /////////////////////////////////////////////////////////
function removefv(truckID, succes,err)
{
    var unfavJson =  {
        "action"  :"removeFavourite",
        "userID"  : user.Id,
        "deviceID":device.Id,
        "deviceType":device.Type,
        "truckID":truckID
    }
    unfavJson = JSON.stringify(unfavJson);
    console.log(JSON.stringify(unfavJson));
    service.ajaxCall(unfavJson,succes,err);
    
    
}



/**************************************************************************************************************************************************
 Purpose: Login Using Register Page in Truck Sales App by Web sebvice.
 Author: Vishal Jain
**************************************************************************************************************************************************/

function validatePageRegister()
{
	var userEmail=validate.EmailValidation({id:email_PageRegister});
	if(userEmail!=true)
    {
		navigator.notification.alert(userEmail,notifySuccess,'TDA','OK');
        return;
	}
	var Password=validate.Password({id:password_PageRegister});
	if(Password!=true)
    {
		navigator.notification.alert(Password,notifySuccess,'TDA','OK');
        return;
	}
	var pass=password_PageRegister.value;
	var confPass=confPassword_PageRegister.value;
	var result=pass.localeCompare(confPass);
	if(result!=0)
    {
		navigator.notification.alert('Password and Confirm Password did not match',notifySuccess,'TDA','OK');
        return;
	}
	else
    {
        var regAction = localStorage.getItem("register_Action")
        var registerData={
            "action": regAction,
            "userName": valid.username,
            "password": valid.passwd,
            "deviceID":device.Id,
            "deviceType":device.Type
        }
        console.log(JSON.stringify(registerData));
        
        registerData = JSON.stringify(registerData);
        service.ajaxCall(registerData,
                    function(result_data)
                    {
                        if(result_data.responseCode==200)
                        {
                            unread_notif=result_data.userInfo.NotificationCount_unreaded;
                            user.Id=result_data.userInfo.userID;
                            user.Type=result_data.userInfo.userType;
                            window.localStorage.setItem("EmailID",valid.username);
                            window.localStorage.setItem("Password",valid.passwd);
                            window.localStorage.setItem("keepMeSignIn","2");
                            window.localStorage.setItem("userId", result_data.userInfo.userID);
                            window.localStorage.setItem("user_Type", result_data.userInfo.userType);
                            loginstatus=1;
                            $('body').find('.notifycount').each(function(){
                                                             $(this).html(result_data.userInfo.NotificationCount_unreaded);
                                                             });
                            $('body').find('.favcount').each(function(){
                                                          $(this).html(result_data.userInfo.FavCount);
                                                          });
                            user.is_Facebook=result_data.userInfo.is_facebookUser;
                            $("#email_PageRegister").val("");
                            $("#password_PageRegister").val("");
                            $("#confPassword_PageRegister").val("");
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert('Thank you for registering, a verification link has been sent to your registered Email. You may need to check your spam and add website@truckdealersaustralia.com.au to your contacts list to ensure you receive our website emails.',notifySuccess,'TDA','OK');
                            navSearch();
                        }
                        else if(result_data.responseCode==0)
                        {
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        }
                    },
                    function(result_data)
                    {
                        //alert(JSON.stringify(result_data));
                        console.log('MY ERROR '+JSON.stringify(result_data));
                    });
	}
    
}

////////////////////////////////////////////////////////////// Register Page Login finish /////////////////////////////////////////////////////////



/**************************************************************************************************************************************************
 Purpose: Get(Fetch) user information from Update profile Web sebvice in Account Information page.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function getUserInformation()
{
        $("#full_Name").val("");
        $("#user_Name").val("");
        $("#emailID").val("");
        $("#phone_Number").val("");
        $("#add_Line1").val("");
        $("#add_Line2").val("");
        //$("#user_Country").val("");
        $("#user_State").val("ACT");
        $("#user_State").selectmenu('refresh', true);
        $("#user_Country").val("Select Country");
        $("#user_Country").selectmenu('refresh', true);
        $("#post_Code").val("");
        var getUserData={
            "action": "getProfile",
            "userID": user.Id,
            "deviceID": device.Id,
            "deviceType": device.Type
        }
        console.log(JSON.stringify(getUserData));
    
        getUserData = JSON.stringify(getUserData);
        service.ajaxCall(getUserData,
                    function(result_data)                                 // Success Callback function
                    {
                        if(result_data.responseCode==200)
                        {
                            console.log(JSON.stringify(result_data));
                            //alert(JSON.stringify(result_data));
                            $("#full_Name").val(result_data.userInfo[0].name);
                            $("#user_Name").val(result_data.userInfo[0].userName);
                            $("#emailID").val(result_data.userInfo[0].emailID);
                            $("#phone_Number").val(result_data.userInfo[0].phone);
                            $("#add_Line1").val(result_data.userInfo[0].addressLine1);
                            $("#add_Line2").val(result_data.userInfo[0].addressLine2);
                            //$("#user_Country").val(result_data.userInfo[0].country);
                            $("#post_Code").val(result_data.userInfo[0].postcode);
                            if(result_data.userInfo[0].state!="")
                            {
                                $("#user_State").val(result_data.userInfo[0].state);
                                $("#user_State").selectmenu('refresh', true);
                            }
                            if(result_data.userInfo[0].country!="")
                            {
                                $("#user_Country").val(result_data.userInfo[0].country);
                                $("#user_Country").selectmenu('refresh', true);
                            }
                        }
                        else if(result_data.responseCode==0)
                        {
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        }
                    },
                    function(result_data)                                 // Error Callback function
                    {
                        //alert(JSON.stringify(result_data));
                        console.log(JSON.stringify(result_data));
                    });
    
}
////////////////////////////////////////////////////////////// Get User Information finish /////////////////////////////////////////////////////////



/**************************************************************************************************************************************************
 Purpose: Update user information from Account Information page by Update profile Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/
var account = {
    Name:"",
    UserNmae:"",
    Email:"",
    Phone:"",
    Address1:"",
    Address2:"",
    State:"",
    Country:"",
    postCode:""
}

function UpdateUserInformation()
{
        var name = validate.blankValidation({id:full_Name,text:"name."});
        if(name!=true)
        {
            navigator.notification.alert(name,notifySuccess,'TDA','OK');
            return;
        }
        var username = validate.blankValidation({id:user_Name,text:"username."});
        if(username!=true)
        {
            navigator.notification.alert(username,notifySuccess,'TDA','OK');
            return;
        }
        var email = validate.emailValid({id:emailID});
        if(email!=true)
        {
            navigator.notification.alert(email,notifySuccess,'TDA','OK');
            return;
        }
        var phone = validate.blankValidation({id:phone_Number,text:"phone."});
        if(phone!=true)
        {
            navigator.notification.alert(phone,notifySuccess,'TDA','OK');
            return;
        }
        var postcode = validate.blankValidation({id:post_Code,text:"postcode."});
        if(postcode!=true)
        {
            navigator.notification.alert(postcode,notifySuccess,'TDA','OK');
            return;
        }
        var country = validate.blankValidation({id:user_Country,text:"country."});
        if(country!=true)
        {
            navigator.notification.alert(country,notifySuccess,'TDA','OK');
            return;
        }
        account.Name = $("#full_Name").val();
        account.UserName = $("#user_Name").val();
        account.Email = $("#emailID").val();
        account.Phone = $("#phone_Number").val();
        account.Address1 = $("#add_Line1").val();
        account.Address2 = $("#add_Line2").val();
        account.State = $("#user_State").val();
        account.Country = $("#user_Country").val();
        account.postCode = $("#post_Code").val();
    
        var regexNum = /^[0-9\b]+$/;
        if(!regexNum.test(account.postCode))
        {
            account.postCode = "";
        }
        
        var user_UpdateData={
            "action": "updateProfile",
            "userID": user.Id,
            "userName": account.UserName,
            "name": account.Name,
            "emailID": account.Email,
            "phone": account.Phone,
            "addressLine1": account.Address1,
            "addressLine2": account.Address2,
            "state": account.State,
            "country": account.Country,
            "postcode": account.postCode,
            "latitude": "-12.801028",
            "longitude": "130.955789",
            "deviceID": device.Id,
            "deviceType": device.Type
        }
        console.log(JSON.stringify(user_UpdateData));
        //alert(JSON.stringify(user_UpdateData));
    
        user_UpdateData = JSON.stringify(user_UpdateData);
        service.ajaxCall(user_UpdateData,
                    function(result_data)
                    {
                        if(result_data.responseCode==200)
                        {
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                            //navSearch();
                        }
                        else if(result_data.responseCode==0)
                        {
                            console.log(JSON.stringify(result_data));
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        }
                    },
                    function(result_data)
                    {
                        //alert(JSON.stringify(result_data));
                        console.log(JSON.stringify(result_data));
                    });
}

////////////////////////////////////////////////////////////// Update User Information finish /////////////////////////////////////////////////////////



/**************************************************************************************************************************************************
 Purpose: Sign Up dealer in Truck sales using signup Dealer Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

var dealer = {
    Name:"",
    SalesName:"",
    phone:"",
    SalesPhone:"",
    Email:"",
    SalesEmail:"",
}

function signupDealer()
{
    dealer.Name = $("#dealer_Name").val();
    dealer.SalesName = $("#dealer_SalesName").val();
    dealer.Phone = $("#dealer_Phone").val();
    dealer.SalesPhone = $("#dealer_SalesPhone").val();
    dealer.Email = $("#dealer_Email").val();
    dealer.SalesEmail = $("#dealer_SalesEmail").val();
    
    var signUpDealerData = {
            "action": "signupDealer",
            "dealer_name": dealer.Name,
            "dealership_name": dealer.SalesName,
            "dealer_phone": dealer.Phone,
            "dealership_sales_phone": dealer.SalesPhone,
            "userName": dealer.Email,
            "dealer_emailID": dealer.Email,
            "dealership_sales_emailID": dealer.SalesEmail,
            "latitude": "-12.801028",
            "longitude": "130.955789"
    }
    
    console.log(JSON.stringify(signUpDealerData));
    signUpDealerData = JSON.stringify(signUpDealerData);
    
    service.ajaxCall(signUpDealerData,
                     function(result_data)
                     {
                     if(result_data.responseCode==200)
                     {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        window.localStorage.setItem("userId", result_data.userInfo.userID);
                        menuClk=0;
                        //$.mobile.changePage("#pageLogin", {transition:"none"});
                        $("#dealer_Name").val("");
                        $("#dealer_SalesName").val("");
                        $("#dealer_Phone").val("");
                        $("#dealer_SalesPhone").val("");
                        $("#dealer_Email").val("");
                        $("#dealer_SalesEmail").val("");

                     }
                     else if(result_data.responseCode==0)
                     {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                     }
                     
                     },
                     function(result_data)
                     {
                        //alert(JSON.stringify(result_data));
                        console.log(JSON.stringify(result_data));
                     });
}


////////////////////////////////////////////////////////////// Sign Up dealer finish /////////////////////////////////////////////////////////


/**************************************************************************************************************************************************
 Purpose: Forget Password using forgetpassword Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function forgetPassword()
{
    var forgetData = {
        emailID :$("#forget_email").val(),
    }
    
    console.log(JSON.stringify(forgetData));
    
    $.ajax({
           type: "POST",
           url:'https://truckdealersaustralia.com.au/mobile/webservices/forgetpassword.php',
           contentType: "application/json",
           dataType: "json",
           data:JSON.stringify(forgetData),
           beforeSend:function()
           {
                spinnerplugin.show();
           },
           complete:function()
           {
                spinnerplugin.hide();
           },
           success: function(result_data,status,jqXHR)
           {
           if(result_data.responseCode==200)
           {
                console.log(result_data);
                navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                navLogin();
           }
           else if(result_data.responseCode==0)
           {
                console.log(result_data);
                spinnerplugin.hide();
                navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
           }
           },
           error: function(jqXHR, textStatus, errorThrown)
           {
                spinnerplugin.hide();
                console.log('err' +JSON.stringify(jqXHR));
           }
    });
}

////////////////////////////////////////////////////////////// Forget Password finish /////////////////////////////////////////////////////////



/**************************************************************************************************************************************************
 Purpose: Fetch favorite list in Truck sales using favoritelist Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function favoriteList()
{
    $('#favorite_List').empty();
    var favorite_ListData = {
        "action": "favouriteList",
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType": device.Type
    }
    
    console.log(JSON.stringify(favorite_ListData));
    favorite_ListData = JSON.stringify(favorite_ListData);
    
    service.ajaxCall(favorite_ListData,
                function(result_data)
                {
                    if(result_data.responseCode==200)
                    {
                        console.log(JSON.stringify(result_data));
                        if(result_data.favouriteTruck==0)
                        {
                            navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        }
                        else
                        {
                            for(i=0;i<result_data.favouriteList.length;i++)
                            {
                                //$('#favorite_List').append('<li><div class="behind buttons-three"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="removeFavourite('+result_data.favouriteList[i].truckID+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="left-sec"><div class="image"><img src="themes/images/truck1.png"></div><div class="discrip"><h3 class="dis-truck">'+result_data.favouriteList[i].headline+'</h3><div class="small-discrip">'+result_data.favouriteList[i].cat_1_name+'/'+result_data.favouriteList[i].cat_2_name+'</div><div class="truckrate">$'+result_data.favouriteList[i].price+'</div></div></div></a></li>');
                     
                                $('#favorite_List').append('<li><div class="behind buttons-three"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="removeFavourite('+result_data.favouriteList[i].truckID+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="left-sec"><div class="image"><img src="https://truckdealersaustralia.com.au/uploads/listings/'+result_data.favouriteList[i].truckID+'/'+result_data.favouriteList[i].image+'"></div><div class="discrip"><h3 class="dis-truck">'+result_data.favouriteList[i].headline+'</h3><div class="small-discrip" onclick="getTruckDetails_AU('+result_data.favouriteList[i].truckID+')">'+result_data.favouriteList[i].cat_1_name+'/'+result_data.favouriteList[i].cat_2_name+'</div><div class="truckrate">$'+result_data.favouriteList[i].price+'</div></div></div></a></li>');
                            }
                            $('#favorite_List').trigger('create');
                            $('#favorite_List').listview('refresh');
                        }
                    }
                    else if(result_data.responseCode==0)
                    {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                    }
                },
                function(result_data)
                {
                     //alert(JSON.stringify(result_data));
                     console.log(JSON.stringify(result_data));
                });
}

////////////////////////////////////////////////////////////// Favourite list finish /////////////////////////////////////////////////////////


/**************************************************************************************************************************************************
 Purpose: Remove truck from favorite list using favoritelist Web sebvice.
 Author: Vishal Jain
 **************************************************************************************************************************************************/

function removeFavourite(truckId)
{
    var remove_FavouriteData = {
        "action":"removeFavourite",
        "userID":user.Id,
        "deviceID":device.Id,
        "deviceType":device.Type,
        "truckID":truckId
    }
    
    console.log(JSON.stringify(remove_FavouriteData));
    remove_FavouriteData = JSON.stringify(remove_FavouriteData);
    
    service.ajaxCall(remove_FavouriteData,
                function(result_data)
                {
                    if(result_data.responseCode==200)
                    {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        favoriteList();
                        $('body').find('.favcount').each(function(){
                                                      $(this).html(result_data.totalFavourites);
                                                      });
                    }
                    else if(result_data.responseCode==0)
                    {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                    }
                },
                function(result_data)
                {
                    //alert(JSON.stringify(result_data));
                    console.log(JSON.stringify(result_data));
                });
}



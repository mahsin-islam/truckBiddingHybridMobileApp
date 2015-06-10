                        /*THIS FILE CONTAINS ALL THE FUNCTIONALITIES REGARDINNG PUSH NOTIFICATIONS
                                                     AUTHOR : AMEEDUDDIN*/


//function getdevicetoken()
//{
//    var pushNotification;
//    try
//    {
//        pushNotification = window.plugins.pushNotification;
//        if (device.platform == 'android' || device.platform == 'Android' || device.platform == 'amazon-fireos' )
//        {
//            pushNotification.register(successHandler, errorHandler, {"senderID":"411039204400","ecb":"onNotification"});		// ITEMCENTRAL required!
//        }
//        else
//        {
//            pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});	// required!
//        }
//    }
//    catch(err)
//    {
//        var txt="There was an error on this page.\n\n";
//        txt+="Error description: " + err.message + "\n\n";
//        alert(txt);
//    }
//}



// handle APNS notifications for iOS
function onNotificationAPN(e)
{
   // alert(JSON.stringify(e));
    console.log("Ameed push-notification  :  "+JSON.stringify(e));
   // alert(JSON.stringify(e));
    unread_notif++;
    navigator.notification.alert(e.alert, function(){},'TDA','OK');
    

}

function tokenHandler (result)
{
    // Your iOS push server needs to know the token before it can push to this device
    // here is where you might want to send it the token for later use.
    console.log("token: "+result);
    localStorage.setItem('devicetoken_TDA',result);
    device.Id = result;
    if( device.Id == undefined || device.Id =='' )
    {
         device.Id='APA91bGUFQePhQ5I1-LfQu_2y6lqz3XUVUdDZDjywAJnZ8eTo7WZUCaKDR45ZAQXoPBqIFT7izWRvrz9J78vwOKEMOiVpfuPGccVhFTHEM98jiKcn_wiHGBB_YyPvpRly20jfi8M47tji4qVC6a4tkRI27TYdUaDDg'
    }
    console.log('device.Id  -   '+device.Id);
}
function successHandler (result)
{
    console.log('badge number success : '+JSON.stringify(result));
}
function errorHandler (error)
{
    console.log('badge number error : '+JSON.stringify(error));
    if( device.Id == undefined || device.Id == '' )
    {
        device.Id='APA91bGUFQePhQ5I1-LfQu_2y6lqz3XUVUdDZDjywAJnZ8eTo7WZUCaKDR45ZAQXoPBqIFT7izWRvrz9J78vwOKEMOiVpfuPGccVhFTHEM98jiKcn_wiHGBB_YyPvpRly20jfi8M47tji4qVC6a4tkRI27TYdUaDDg'
    }
   // alert('badge number error cannot get device token : '+JSON.stringify(error));
}
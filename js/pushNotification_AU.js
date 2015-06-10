                    //THIS FILE CONTAINS FUNCTIONALITIES  FOR MANAGING PUSH NOTIFICATION
                                    //Author : Ameeduddin


/*****************************************************************************************
 Function to GET PUSH NOTIFIACTION STATUS
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
var notification_Id = [];
function getNotif_Status()
{
    //alert('get notifvvvvv');
   $('#flip_3').slider();
    var usr_idSend = user.Id;
    
    if(usr_idSend == '' || usr_idSend == null)
    {
        usr_idSend = "0";
    }
    
   var getnotifStatus_Json = {  "action": "getNotificatioStatus",
                                "userID":  usr_idSend
                             };
    getnotifStatus_Json=JSON.stringify(getnotifStatus_Json);
    console.log('getnotifStatus_Json -  '+getnotifStatus_Json);
    $.mobile.changePage("#pageNotifySetting", {transition:"none"});
    service.ajaxCall(getnotifStatus_Json,function(result_data){
                        console.log('SUCCSSSS   '+JSON.stringify(result_data));
                       // alert(document.getElementById("flip_3").value+' \n\n filp val '+document.getElementById("flip_3").value+'  - ')
                        if(result_data.responseCode == 200)
                        {
                            var notif_val=result_data.notificationStatus;
                            if(notif_val == undefined || notif_val == '' || notif_val == null )
                            {
                                notif_val=1;
                            }
                            document.getElementById("flip_3").selectedIndex = notif_val;
                            $('#flip_3').slider('refresh');
                            console.log(' \n\n nn filp val '+document.getElementById("flip_3").value);
                            $.mobile.changePage("#pageNotifySetting", {transition:"none"})
                        }
                        else
                        {
                                document.getElementById("flip_3").selectedIndex = 1;
                                 $('#flip_3').slider('refresh');
                                console.log(' \n\n nn filp val '+document.getElementById("flip_3").value);
                            $.mobile.changePage("#pageNotifySetting", {transition:"none"});
                     
                        }
                     },
                     function(result_data)
                     {
                        console.log('ERRORRRRRR    '+JSON.stringify(result_data));
                        navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                        $.mobile.changePage("#pageNotifySetting", {transition:"none"});
                     
                     });
                     
}



/*****************************************************************************************
 Function to UPDATE PUSH NOTIFIACTION STATUS
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/


$(document).on('change' ,'#flip_3' ,function()
{
    console.log('dhhdhddhdd');
    var usr_idSend = user.Id;
               
    if(usr_idSend == '' || usr_idSend == null)
    {
         usr_idSend = "0";
     }
    console.log(document.getElementById("flip_3").value);
    var updatenotifStatus_Json = {  "action": "updateNotificationStatus",
                                     "userID": usr_idSend,
                                     "status": document.getElementById("flip_3").value
                                 };
    updatenotifStatus_Json=JSON.stringify(updatenotifStatus_Json);
    console.log('updatenotifStatus_Json -  '+updatenotifStatus_Json);
                         
    service.ajaxCall(updatenotifStatus_Json,function(result_data){
                       if(result_data.responseCode == 200)
                        {
                            navigator.notification.alert('Your Notification Settings have been saved', function(){},'TDA','OK');
                        }
                                             
                    },
                     function(result_data)
                   {
                         navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                   });
 });

/*****************************************************************************************
 FUNCTION TO Display ENQUIRY DETAILS from Notification List pahe   --    --- ---
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   : notification id
 *******************************************************************************************/
//function viewenquiryNotif(divid,notif_ID)
//{
//    $.mobile.changePage("#pagedisplyEnquery", {transition:"none"})
//    alert(notif_ID);
//    
//}


/*****************************************************************************************
 IMPLEMENT PUSH NOTIFIACTION    --    --- ---
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
function clickofnotifLi(div_id,noticatn_id)
{
    var usr_idSenda = user.Id;
    if(usr_idSenda == '' || usr_idSenda == null)
    {
        usr_idSenda = "0";
    }
    
   // alert(div_id+'  '+noticatn_id+'  '+div_id.split('_')[1]);
    console.log(div_id+'  '+noticatn_id);
    var div_idtosendTruckfn = div_id.split('_')[1];
    var markRead_json = { "action":"markAsRead",
                          "userID":usr_idSenda,
                          "notificationID":noticatn_id
                        }
    markRead_json=JSON.stringify(markRead_json);
    console.log('markRead_json  '+markRead_json);
    
    service.ajaxCall(markRead_json,function(result_data)
                     {
                        if(result_data.responseCode == 200)
                        {
                     
                            console.log('div_idtosendTruckfn  '+div_idtosendTruckfn);
                     
                           // unread_notif=unread_notif-1;
                     
                            $('body').find('.notifycount').each(function()
                                            {
                                               unread_notif = result_data.totalUnReaded;
                                               $(this).html(result_data.totalUnReaded);
                                            });

                        $('#img'+div_id).attr('src','themes/images/tickdayscal.png');
                            getTruckDetails_AU(div_idtosendTruckfn);

                        }
                        else
                        {
                            console.log('div_idtosendTruckfn  '+div_idtosendTruckfn)
                            getTruckDetails_AU(div_idtosendTruckfn);
                        }
                     
                     },
                     function(result_data)
                     {
                        getTruckDetails_AU(div_idtosendTruckfn);
                     
                     });
                     

    
}






function placeNotifList(resp_in)
{
    //alert(JSON.stringify(resp_in));
    try
    {
        $('#notifiaction_list').empty();
        $.mobile.changePage("#pageNotification", {transition:"none"});
            //var time= new date();
        if(resp_in.responseMessage == "You don't have any notification.")
        {
            navigator.notification.alert('No notifications', function(){},'TDA','OK');
        }
        else if(resp_in.hasOwnProperty('notificationList'))
        {
                //alert('length - '+resp_in.notificationList.length);
            for(var i=0;i<resp_in.notificationList.length;i++)
            {
                var div_Id = 'notifList_'+resp_in.notificationList[i].truckID;
                var listNotif_id=resp_in.notificationList[i].notificationID;
                notification_Id[i] = resp_in.notificationList[i].notificationID;
                
                if(resp_in.notificationList[i].type == 'Publish Listing' && resp_in.notificationList[i].isread == "0")
                {
                    
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/daysicon.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">was successfully published</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                }
                else if(resp_in.notificationList[i].type == 'Publish Listing' && resp_in.notificationList[i].isread == "1")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/tickdayscal.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+'</span></div><div class="view-rows discrip"><span class="msg-green">was successfully published</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                }
            
                if(resp_in.notificationList[i].type == 'Weekly Update' && resp_in.notificationList[i].isread == "0")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/daysicon.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">was updated</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/daysicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                else if(resp_in.notificationList[i].type == 'Weekly Update' && resp_in.notificationList[i].isread == "1")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/tickdayscal.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">was updated</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');

                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/tickdayscal.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                if(resp_in.notificationList[i].type == 'Update Listing' && resp_in.notificationList[i].isread == "0")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/daysicon.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">was updated</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/daysicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                else if(resp_in.notificationList[i].type == 'Update Listing' && resp_in.notificationList[i].isread == "1")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/tickdayscal.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green"> was updated</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/tickdayscal.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                
                if(resp_in.notificationList[i].type == 'Price Update' && resp_in.notificationList[i].isread == "0")
                {
                    
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/daysicon.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">has a price update</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/tickdayscal.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                
                
                }
                else if(resp_in.notificationList[i].type == 'Price Update' && resp_in.notificationList[i].isread == "1")
                {
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/tickdayscal.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].headline+';</span></div><div class="view-rows discrip"><span class="msg-green">has a price update</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/daysicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                else if(resp_in.notificationList[i].type == 'Subscription Expired' && resp_in.notificationList[i].isread == "0")
                {
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/bellicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                    
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/daysicon.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].message+'&#34;</span></div><div class="view-rows discrip"><span class="error-red">is about to expire</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                
                
                }
                else if(resp_in.notificationList[i].type == 'Subscription Expired' && resp_in.notificationList[i].isread == "1")
                {
                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/bellicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                    
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'" ><div class="leftpart bellicon"><img id="img'+div_Id+'" src="themes/images/tickdayscal.png"></div><div class="rightpart" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"><div class="view-rows title"><span class="left">Your listing:</span> <span class="right">&#34;'+resp_in.notificationList[i].message+'&#34;</span></div><div class="view-rows discrip"><span class="error-red">is about to expire</span></div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>');
                    
                    
                }
                
                else if(resp_in.notificationList[i].type == 'enquiry' || resp_in.notificationList[i].type == 'Enquiry')
                {
                     var hhdng ='';
                    if(resp_in.notificationList[i].name == "" || resp_in.notificationList[i].name == " ")
                    {
                        hhdng =' SOMEONE enquired about your listing';
                    }
                    else
                    {
                          hhdng =resp_in.notificationList[i].name.toUpperCase()+' enquired about your listing';
                    }
                   
                    $('#notifiaction_list').append('<li><div class="behind buttons-three-notify"><a href="#" class="ui-btn delete-btns"><div class="images-hidden" onclick="delete_notification('+i+')"><img src="themes/images/deleteicon.png"></div></a></div><a class="trackdetail favdetails"><div class="rows" id="'+div_Id+'"><div class="leftpart" ><img src="themes/images/bellicon.png"></div><div class="rightpart" onclick="get_Enq_Details(\''+i+'\',\''+resp_in.notificationList[i].headline+'\')"><div class="view-rows title">'+hhdng+' </div><div class="view-rows discrip">&#34;'+resp_in.notificationList[i].headline+'&#34;</div><div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div></a></li>')

                    //$('#notifiaction_list').append('<div class="rows" id="'+div_Id+'" onclick="clickofnotifLi(\''+div_Id+'\',\''+listNotif_id+'\')"> <div class="leftpart"> <img src="themes/images/bellicon.png"> </div><div class="rightpart"><div class="view-rows title">'+resp_in.notificationList[i].message+'</div><div class="view-rows discrip"><h3>'+resp_in.notificationList[i].headline+'</h3></div> <div class="view-rows time">'+timeDiffrnc(resp_in.notificationList[i].created_at)+'</div></div></div>')
                }
                $('#notifiaction_list').trigger('create');
                $('#notifiaction_list').listview('refresh');
            }
        }
    }
    catch(ex)
    {
        alert(ex);
    }
    
}



/*****************************************************************************************
 GET LIST OF NOTIFICATION  NOTIFIACTION    --    --- ---
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/


function getListofNotifactn()
{
    var usr_idSend = user.Id;
    
    if(usr_idSend == '' || usr_idSend == null)
    {
        usr_idSend = "0";
    }
    
    var request_Json={ "action":"notificationList",
                        "userID":usr_idSend
                    };
    
    request_Json=JSON.stringify(request_Json);
    console.log('request_Json -  '+request_Json);
    
    service.ajaxCall(request_Json,function(result_data)
                     {
                        console.log('result_data '+JSON.stringify(result_data))
                        if(result_data.responseCode == 200)
                        {
                            placeNotifList(result_data)
                            unread_notif= result_data.totalUnReaded ;
                            $('body').find('.notifycount').each(function()
                                                         {
                                                         unread_notif = result_data.totalUnReaded;
                                                         $(this).html(result_data.totalUnReaded);
                                                         });

                        }
                        else
                        {
                            $('#notifiaction_list').empty();
                     
                            navigator.notification.alert('No notifications', function(){},'TDA','OK');
                             $.mobile.changePage("#pageNotification", {transition:"none"});
                        }
                     },
                     function(result_data)
                     {
                         //$.mobile.changePage("#pageNotification", {transition:"none"});
                         navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                     });
    
   
}


/*****************************************************************************************
 Purpose: Delete Notification.
 AUTHOR: Vishal Jain
 *******************************************************************************************/

function delete_notification(index)
{
    //alert(index);
    var usr_idSend = user.Id;
    
    if(usr_idSend == '' || usr_idSend == null)
    {
        usr_idSend = "0";
    }
    
    var delete_notify_data={
        "action":"deleteNotification",
        "userID":usr_idSend,
        "notificationID": notification_Id[index]
    }
    
    delete_notify_data=JSON.stringify(delete_notify_data);
    console.log('request_Json -  '+delete_notify_data);
    
    service.ajaxCall(delete_notify_data,function(result_data)
                     {
                     console.log('result_data '+JSON.stringify(result_data))
                     if(result_data.responseCode == 200)
                     {
                     
                        getListofNotifactn();
                        $('body').find('.notifycount').each(function()
                                                         {
                                                         unread_notif = result_data.totalUnReaded;
                                                         $(this).html(result_data.totalUnReaded);
                                                         });

                     }
                     else
                     {
                     $('#notifiaction_list').empty();
                     
                        navigator.notification.alert('No notifications', function(){},'TDA','OK');
                        $.mobile.changePage("#pageNotification", {transition:"none"});
                     }
                     },
                     function(result_data)
                     {
                     //$.mobile.changePage("#pageNotification", {transition:"none"});
                     navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                     });
}


/*****************************************************************************************
 Purpose: Delete Notification.
 AUTHOR: Vishal Jain
 *******************************************************************************************/

function get_Enq_Details(index,gheading)
{
    var getEnq_Data =
    {
        "action":"enquiryDetail",
        "notificationID":notification_Id[index]
    }
    
    getEnq_Data=JSON.stringify(getEnq_Data);
    console.log('request_Json -  '+getEnq_Data);
    
    service.ajaxCall(getEnq_Data,function(result_data)
                     {
                     console.log('Enquery_data '+JSON.stringify(result_data))
                     if(result_data.responseCode == 200)
                     {
                        $('#date_time').empty();
                        $('#enquires_name').empty();
                        $('#enquires_msg').empty();
                        $('#enquires_email').empty();
                        $('#enqr_top').empty();
                         var headingh3 = "Enquiry for truck "+gheading
                        $('#enqr_top').append(' <h3> '+headingh3+'</h3>')
                        $('#enqr_top').trigger('create');
                        $('#date_time').append(result_data.enquiryDetail.created_at);
                        $('#enquires_name').append(result_data.enquiryDetail.name);
                        $('#enquires_msg').append(result_data.enquiryDetail.message);
                        $('#enquires_email').append(result_data.enquiryDetail.email);
                     
                     
                     
                        $.mobile.changePage("#pagedisplyEnquery", {transition:"none"});
                     
                        var markRead_json = { "action":"markAsRead",
                                              "userID":user.Id,
                                              "notificationID":notification_Id[index]
                                            }
                        markRead_json=JSON.stringify(markRead_json);
                        console.log('ENQUIRY markRead_json  '+markRead_json);
                    
                        service.ajaxCall(markRead_json,function(result_data)
                                      {
                                         if(result_data.responseCode == 200)
                                         {
                                            //unread_notif=unread_notif-1;
                                            $('body').find('.notifycount').each(function()
                                                                             {
                                                                                unread_notif = result_data.totalUnReaded
                                                                             $(this).html(unread_notif );
                                                                             });
                                         }
                                      },
                                      function(result_data)
                                      {
                                         console.log('UNREAD     '+unread_notif)
                                      });
                     
                     }
                     else
                     {
                        //$('#notifiaction_list').empty();
                        navigator.notification.alert('No notifications', function(){},'TDA','OK');
                     }
                     },
                     function(result_data)
                     {
                     //$.mobile.changePage("#pageNotification", {transition:"none"});
                     navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                     });


}


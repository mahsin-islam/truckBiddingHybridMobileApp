                            //  THIS FILE CONTAINS FUNCTIONALITIES  ON THE LISTING SCREEN FOR THE TRUCKS AND SAVED SEARCHES SCREEN
                                                        //Author : Ameeduddin




/*****************************************************************************************
 Function to LOAD AND DELETE  SAVEDSEARCHED  TRUCKS on  "Saved Searches screen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
function deleteSavedsrch(srchId)
{
    var s_id='#'+srchId;
    
    var deleSavedserch_Json =  {
                            "action":"deleteSavedSearch",
                            "searchID":srchId.split('_')[1]
                        }
    deleSavedserch_Json= JSON.stringify(deleSavedserch_Json);
    console.log('deleSavedserch_Json  '+deleSavedserch_Json);
    
    service.ajaxCall( deleSavedserch_Json,function(result_data){
                     console.log('DELETERD SEARCH    - '+JSON.stringify(result_data))
                     if(result_data.responseCode == 200)
                     {
                        $(s_id).remove();
                     }
                     else
                     {
                     navigator.notification.alert('Saved Search cannot be deleted', function(){},'TDA','OK');
                     }
                     
                     },function(result_data){
                     
                     navigator.notification.alert('Cannot Connect to server', function(){},'TDA','OK');
                     })
}

/*****************************************************************************************
 Function to LOAD AND DISPLAY SAVEDSEARCHED  TRUCKS on  "Saved Searches screen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
function placeDAtaSavedserch_AU(data_in)
{
    
//    $.mobile.changePage("#pageSaveSearch", {transition:"none"})
//    $( "#panelSaveSearch" ).panel( "close" );
//    menuClk=0;
    console.log('qry_urlIn  '+data_in)
    savesearch=1;
    quwerystringSved='https://truckdealersaustralia.com.au/api/search/?'+data_in+'&page=0';
   // queryString_truckSearch = '?'+data_in+'&page='+page;
    
    console.log('   quwerystringSved  '+quwerystringSved);
    
    //getTruckDetails_AU();
    spinnerplugin.show();
    $.ajax({
            type: "POST",
            url:quwerystringSved,
            contentType: "application/json",
            dataType: "json",
            beforeSend:function(){
            },
            complete:function(){
            },
            success: function(result)
            {
                console.log('string Saved seasrch  '+JSON.stringify(result));
                        var total=result.hits.total;
//                        numOfPage=Math.ceil(total/100);
//                        if(numOfPage>0&&numOfPage>page){
//                            page++;
//                        }
                if(result.hits.total > 0)
                {
                    trukListData_AU=result;
                    console.log(' trukListData_AU   string '+JSON.stringify(trukListData_AU));
                    localStorage.setItem('saveSearch_truckList',quwerystringSved);
                    spinnerplugin.hide();
                    displayTruckList_AU(result);
                    //$.mobile.changePage("#pageSearchResult", {transition:"slide"})
                }
                else
                {
                    spinnerplugin.hide();
                    navigator.notification.alert('No listings matched your specific search criteria.', function(){},'TDA','OK');
                    //$.mobile.changePage("#pageSearchResult", {transition:"none"})
                }
           },
           error: function()
           {
                spinnerplugin.hide();
                navigator.notification.alert('Cannot connect to server', function(){},'TDA','OK');
                // $.mobile.changePage("#pageSearchResult", {transition:"none"})
           }
        });
}
//displaySavedSearches_AU  searchYrSavedsrch(\''+savedsearch_id+'\',\''+result_data.favouriteSearches[i].searchUrl+'\');
function displaySavedSearches_AU()
{
    getsavedserch_Json= {   "action":"getSavedSearch",
                            "userID":user.Id
                        };
    
    getsavedserch_Json=JSON.stringify(getsavedserch_Json);
    
    console.log(getsavedserch_Json);
    
    service.ajaxCall( getsavedserch_Json,function(result_data)
                     {
                        console.log('sucs '+JSON.stringify(result_data));
                        var aaaa=JSON.stringify(result_data)
                   
                        $('#savedSearchList_SavdSerchPg').empty();
                        $('#savedSearchList_SavdSerchPg').listview();
                     
                        if(result_data.responseCode == 200)
                        {
                            for(var i=0;i<result_data.favouriteSearches.length;i++)
                            {
                                var c='ddddd';
                                var ret_val = timeDiffrnc(result_data.favouriteSearches[i].saved_at);
                     
                                var savedsearch_id = 'saved_'+result_data.favouriteSearches[i].searchID;
                                var qury_array=result_data.favouriteSearches[i].searchUrl.split('&');
                                var dispalyString='';
                     
                                for (var ii=0;ii<qury_array.length;ii++)
                                {
                                    if(!(qury_array[ii].indexOf('cat') > -1))
                                    if(qury_array[ii].split('=')[0].indexOf('[') > -1 || qury_array[ii].split('=')[0].indexOf(']') > -1)
                                    {
                                        dispalyString =dispalyString+ qury_array[ii].split('=')[0]+' : '+qury_array[ii].split('=')[1]+',';
                                    }
                                    else
                                    {
                                        dispalyString =dispalyString+ qury_array[ii].split('=')[0]+' : '+qury_array[ii].split('=')[1]+',';
                     
                                    }
                                }
                                if(dispalyString.slice(-1) == ',')
                                dispalyString= dispalyString.substring(0, dispalyString.length - 1);
                     
                                    dispalyString = dispalyString.replace(/[\[\]']+/g,'');
                                    dispalyString = dispalyString.replace(/_/g, ' ');
                                    dispalyString = dispalyString.replace(/ty/g, 'Ty');
                                    dispalyString = dispalyString.replace(/state/g, 'State');
                                    dispalyString = dispalyString.replace(/make/g, 'Make');
                                    dispalyString = capitalize(dispalyString);
//                                alert('dispalyString '+dispalyString);
                                                                            
                                 $('#savedSearchList_SavdSerchPg').append('<li class="clearfix" id="'+savedsearch_id+'"><div class="behind buttons-three-delete"><a href="#" class="ui-btn delete-btns"><div class="images-hidden"><img src="themes/images/deleteicon.png" onclick="deleteSavedsrch(\''+savedsearch_id+'\')"></div></a></div><a class="search-discriptions"><div class="left-sec"><div class="discrip"><div class="seach-discrip"><ul> <li>'+dispalyString+'</li></ul></div><div class="search-time"><span class="time">'+ret_val+'</span> <span class="days">'+getTodayDate()+'</span></div></div></div> <div class="right-sec"><img src="themes/images/searchicon.png" onclick="placeDAtaSavedserch_AU(\''+result_data.favouriteSearches[i].searchUrl+'\')"></div></a></li>');
                                                                            
                                                                            
                     
//                                $('#savedSearchList_SavdSerchPg').append ('<li class="clearfix" id="'+savedsearch_id+'"><div class="behind buttons-three-delete"><a href="#" class="ui-btn delete-btns"><div class="images-hidden"><img src="themes/images/deleteicon.png" onclick="deleteSavedsrch(\''+savedsearch_id+'\')"></div></a></div> <a class="search-discriptions"><div class="left-sec"> <div class="discrip"> <div class="seach-discrip"> <ul>  <li>'+dispalyString+'</li> </ul> </div> <div class="search-time"><span class="time">'+ret_val+'</span> <span class="days">'+getTodayDate()+'</span></div> </div> </div> </a> </li>')
                  
                     
                     }
                        $('#savedSearchList_SavdSerchPg').trigger('create');
                        $('#savedSearchList_SavdSerchPg').addClass('swipe-delete-save');
                     }
                        $('#savedSearchList_SavdSerchPg').listview('refresh');
                        $.mobile.changePage("#pageSaveSearch", {transition:"none"})
                        $( "#panelSaveSearch" ).panel( "close" );
                     },
                     function(result_data)
                     {
                        console.log('failure '+JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                        $( "#panelSaveSearch" ).panel( "close" );
                        menuClk=0;
                     });
}


/*****************************************************************************************
 Function to display the diffrence of time between the current time and a timestamp
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/

function timeDiffrnc(in_timestamp)
{
                                                                            
    in_timestamp=in_timestamp*1000;
   
    var d = new Date(in_timestamp);
        cd = d.getTime();
   
    var d2 =new Date();
    var aj =d2.getTime();
     
   console.log('ABHI KA TIME  '+ aj+' \n server tiem '+cd);
   var c=aj-in_timestamp;                     //subtracted Time
                                                                            
//    alert(in_timestamp+'\n'+aj+'\n'+c)
  try{
        var days = c/(1000*60*60*24);   //days
        var hrs,min,secc;
                                                                            
        days=Math.floor(days);
        var prnt_val = Math.floor(days)+' days ago';
                                                                            
    if(days<2)
    {
        prnt_val = days+' day ago';
        //alert(days+'     '+prnt_val)
    }
    if(days<=0)
    {
        hrs=c/(1000*60*60);         //hours
                                                                            
        prnt_val = Math.floor(hrs) +' hrs ago';
                                                                            
        //alert(days+' '+hrs+'     '+prnt_val)
                                                                            
        if(hrs<2)
        {
            prnt_val = Math.floor(hrs)+' hr ago';
            // alert(days+' '+hrs+'     '+prnt_val)
           // alert(prnt_val)
        }
       //alert(hrs)
       hrs = Math.floor(hrs)
        
    }
    if(hrs<=0)
    {
       
        min=c/(1000*60);            //minutes
                                                                            
        prnt_val = Math.floor(min)+' mins ago';
                                                                            
       // alert(days+' '+'  '+hrs+' '+min+'     '+prnt_val)
        if(min<2)
        {
            //alert(days+' '+'  '+hrs+' '+min+'     '+prnt_val)
            prnt_val = Math.floor(min)+' min ago';
        }
      min = Math.floor(min);
        
    }
    if(min<=0)
    {
        //alert('sec')
        secc=c/(1000);               //seconds
        prnt_val= Math.floor(secc)+' sec ago';
       
         //alert(days+' '+min+'  '+hrs+' '+min+'     '+prnt_val)
                                                                            
        if(secc<2)
        {
            prnt_val = Math.floor(secc)+' sec ago';
        }
        if(secc<0)
        {
          prnt_val = 'few sec ago';
        }
         secc = Math.floor(secc)
                                                                            
    }
   }catch(ex)
    {
        //alert(ex)
     }

    return prnt_val;
    
}

function getTodayDate()
{
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth();
    mm = mm+1;
    if(dd.toString().length==1)
    {
        dd='0'+dd;
    }
    if(mm < 10)
    {
        mm='0'+mm+'';
    }
    var today_dt = dd+"/"+mm+"/"+d.getFullYear();
    return today_dt;
    
}















                    //THIS FILE CONTAINS FUNCTIONALITIES  ON THE TRUCK LISTING SCREEN Obtained from search screen
                    //Author : Ameeduddin


function changeStateName(state_id)
{
   console.log(state_id)
    var state_fullform;
   
    switch(state_id)
    {
//            console.log(state_id);
        case 'NT':
         state_fullform='Northern Territory';
        break;
        case 'WA':
           state_fullform='Western Australia';
        break;
        case 'NSW':
            state_fullform='New South Wales';
        break;
        case 'ACT':
            state_fullform='Australian Capital Territory';
        break;
        case 'VIC':
            state_fullform='Victoria';
        break;
        case 'QLD':
            state_fullform='Queensland';
        break;
        case 'SA':
            // alert('sa');
            state_fullform='South Australia';
        break;
        case 'TAS':
            state_fullform='Tasmania';
        break;
        default:
            state_fullform=state_id;
    }
    //alert(state_fullform);
    return state_fullform;
    
}


function Short_StateName(fullState_Name)
{
    var state_shortform;
    switch(fullState_Name)
    {
        case 'Northern Territory':
            state_shortform='NT';
            break;
        case 'Western Australia':
            state_shortform='WA';
            break;
        case 'New South Wales':
            state_shortform='NSW';
            break;
        case 'Australian Capital Territory':
            state_shortform='ACT';
            break;
        case 'Victoria':
            state_shortform='VIC';
            break;
        case 'Queensland':
            state_shortform='QLD';
            break;
        case 'South Australia':
            state_shortform='SA';
            break;
        case 'Tasmania':
            state_shortform='TAS';
            break;
        default:
            state_shortform='fullState_Name'
    }
    return state_shortform;
}


function SendMail()
{
    
}


/*******************************************************
 Function to DISPLAY ALL Details of a truck
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/
function displaySelectedtruckInfo(suc_res)
{
 //alert(suc_res.truckData.street_line_1+'   '+suc_res.truckData.headline+'\n \n'+'  sucs '+JSON.stringify(suc_res));
    try
    {
        var favourite= suc_res.truckData.isFavourite;
        
        var addrs_seltruck = suc_res.truckData.address.street_line_1+' ,'+suc_res.truckData.address.street_line_2+' ,'+suc_res.truckData.address.suburb
        if( suc_res.truckData.address.street_line_2 == '')
        {
            addrs_seltruck = suc_res.truckData.address.street_line_1+' ,'+suc_res.truckData.address.suburb
        }
        var cityandcode_seltruck = suc_res.truckData.address.state+' ,'+suc_res.truckData.address.postcode;
        
        
        alert('addrs_seltruck '+addrs_seltruck+'   '+cityandcode_seltruck);
        
        
        var telphno = 'tel:'+suc_res.truckData.dealership_phone;
        
        if(addrs_seltruck.slice(-1) == ',')
        {
            addrs_seltruck = addrs_seltruck.substring(0, addrs_seltruck.length - 1);
        }
        if(addrs_seltruck.slice(0) == ',')
        {
            addrs_seltruck = addrs_seltruck.substring(1, addrs_seltruck.length);
        }
        if(addrs_seltruck.slice(0) == '.')
        {
            addrs_seltruck = addrs_seltruck.substring(2, addrs_seltruck.length);
        }
        if(cityandcode_seltruck.slice(-1) == ',')
        {
            cityandcode_seltruck = cityandcode_seltruck.substring(0, cityandcode_seltruck.length - 1);
        }
        if(cityandcode_seltruck.slice(0) == ',')
        {
            cityandcode_seltruck = cityandcode_seltruck.substring(1, cityandcode_seltruck.length);
        }
        
        $('#h1containr').empty();
        $('#remaingDetails_selectedTruck').empty();
        $('#uppercollapsible_resultPg').empty();
        $('#custom_attributes_Au').empty();
        $('#further_detailsa').empty();
//        $('#lowercollapsible_resultPg').empty();
        $('#h1containr').append('<h3 class="titile" id="topHeader_prodctdetailsPg">'+suc_res.truckData.headline+'</h3>');
        // $('#h1containr').append('<h3 class="titile" id="topHeader_prodctdetailsPg">'+suc_res.truckData.headline+'</h3>');
        var type_local=suc_res.truckData.truckDetail.type;
        type_local = type_local.replace(/_/g, ' ');
        type_local = capitalize(type_local);
        var pricelocal = suc_res.truckData.truckDetail.price;
        pricelocal=addCommas(pricelocal);
        if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
        {
            pricelocal=' -'
        }
        else
        {
            pricelocal=' $'+pricelocal;
        }
        if(favourite == 1)
            
        {
            
            $('#remaingDetails_selectedTruck').append('<div class="top-leften"><span class="views prodenq" truckDet="td_'+suc_res.truckData.truckID+'_'+suc_res.truckData.truckDetail.reference_number+'_'+suc_res.truckData.headline+'_'+suc_res.truckData.truckDetail.dealerID+'" id="mailme_selectedtruck" onclick="enquiryDealAndTruck(this)"><a href="#">Enquiry</a></span><span class="views prodcall" id="callme_selectedtruck"><a href="'+telphno+'">Call</a></span><span class="views prorating-change"  onclick="favUnNfav()" id="favspandetl"></span></div><div class="mid"><ul><li class="dealername">'+type_local+'</li> <li class="dealeryear refbmk">REF: '+suc_res.truckData.truckDetail.reference_number+'</li> <li class="dealerland refbmkamt">'+pricelocal+'</li></ul></div><div class="addresspoints" onclick="openMap(this)"><h3>'+addrs_seltruck+'</br>'+cityandcode_seltruck+'</h3> </div>')
            
            $('#favspandetl').attr('parmters',favourite+'_favspandetl_'+suc_res.truckData.truckID)
            
            
        }
        else //if(favourite == 0)
        {
            
            $('#remaingDetails_selectedTruck').append('<div class="top-leften"><span class="views prodenq" truckDet="td_'+suc_res.truckData.truckID+'_'+suc_res.truckData.truckDetail.reference_number+'_'+suc_res.truckData.headline+'_'+suc_res.truckData.truckDetail.dealerID+'" id="mailme_selectedtruck" onclick="enquiryDealAndTruck(this)"><a href="#">Enquiry</a></span><span class="views prodcall" id="callme_selectedtruck"><a href="'+telphno+'">Call</a></span><span class="views prorating"  onclick="favUnNfav()" id="favspandetl"></span></div><div class="mid"><ul><li class="dealername">'+type_local+'</li> <li class="dealeryear refbmk">REF: '+suc_res.truckData.truckDetail.reference_number+'</li> <li class="dealerland refbmkamt">'+pricelocal+'</li></ul></div><div class="addresspoints" onclick="openMap(this)"><h3>'+addrs_seltruck+'</br>'+cityandcode_seltruck+'</h3> </div>');
            
//            alert('elsefavourite'+favourite+'   -   '+ $('#favspandetl').attr('class'))
            
            $('#favspandetl').attr('parmters',favourite+'_favspandetl_'+suc_res.truckData.truckID)
        }
        
        $('#uppercollapsible_resultPg').append('<div data-role="collapsibleset" data-theme="a" data-content-theme="a" data-iconpos="right"><div data-role="collapsible"> <h3>Description</h3> <div class="discrippragraph">'+suc_res.truckData.description+'-</div></div></div>');
        
        $('#uppercollapsible_resultPg').trigger('create');
        
        
        var alternate_var=0;
        $('#custom_attributes_Au').append('<div class="view  odd"><span class="left">Price : </span><span class="right">'+pricelocal+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Type : </span><span class="right">'+type_local+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view  odd"><span class="left">Make : </span><span class="right">'+suc_res.truckData.truckDetail.make+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Model : </span><span class="right">'+suc_res.truckData.truckDetail.model+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Reference Code : </span><span class="right">'+suc_res.truckData.truckDetail.reference_number+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Odometer : </span><span class="right">'+suc_res.truckData.truckDetail.odometer+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Catagory : </span><span class="right">'+suc_res.truckData.truckDetail.cat_1_name+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Sub Catagory : </span><span class="right">'+suc_res.truckData.truckDetail.cat_2_name+' </br>'+suc_res.truckData.truckDetail.cat_3_name+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Serial Number : </span><span class="right">'+suc_res.truckData.truckDetail.serial_number+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Engine Capacity : </span><span class="right">'+suc_res.truckData.truckDetail.engine_capacity+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Engine Power : </span><span class="right">'+suc_res.truckData.truckDetail.engine_power+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">VIN : </span><span class="right">'+suc_res.truckData.truckDetail.vin+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">GCM : </span><span class="right">'+suc_res.truckData.truckDetail.gcm+'</span></div>');
        if(suc_res.truckData.truckDetail.hasOwnProperty('year'))
        {
            
            $('#custom_attributes_Au').append('<div class="view even"><span class="left">Year : </span><span class="right">'+suc_res.truckData.truckDetail.year+'</span></div>');
        }
        
        if(suc_res.truckData.truckDetail.registration_date.substring(0, 2) != '00')
        {
            $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Registration_date : </span><span class="right">'+suc_res.truckData.truckDetail.registration_date.substring(0, 10) +'</span></div>');
        }
        
        $('#middlecollapsible_resultPg').trigger('create');

        for(var i=0;i<suc_res.truckData.furtherDetail.length;i++)
        {
            if(alternate_var == 0)
            {
                if(suc_res.truckData.furtherDetail[i].value != '')
                {
                    if(suc_res.truckData.furtherDetail[i].name == "Options")
                    {
                        var values_op=suc_res.truckData.furtherDetail[i].value[0];
                        var values_op=suc_res.truckData.furtherDetail[i].value[0].replace("[","");
                        values_op=values_op.replace("]","");
                        values_op=values_op.split(",");
                        var optn_val='';
                        
                        for(var j=0;j<3;j++)
                        {
                            optn_val =optn_val+values_op[j]+',';
                            optn_val =optn_val.replace('"',"");
                            optn_val =optn_val.replace('"',"");
                        }
                        optn_val=optn_val.substring(0, optn_val.length - 1);
                        optn_val=optn_val.replace('"','')
                        //   alert(optn_val);
                        $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' : </span><span class="right">'+optn_val+'</span></div>');
                        alternate_var =0;

                    }
                    else
                    {
                        $('#further_detailsa').append('<div class="view odd"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' : </span><span class="right">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                        alternate_var =1;
                    }
                }
            }
            else
            {
                if(suc_res.truckData.furtherDetail[i].value != '')
                {
                    if(suc_res.truckData.furtherDetail[i].name == "Options")
                    {
                        var values_op=suc_res.truckData.furtherDetail[i].value[0].replace("[","");
                        values_op=values_op.replace("]","");
                        values_op=values_op.split(",");
                        var optn_val='';
                        
                        for(var j=0;j<3;j++)
                        {
                           optn_val =optn_val+values_op[j]+',';
                           optn_val =optn_val.replace('"',"");
                           optn_val =optn_val.replace('"',"");
                        }
                        optn_val=optn_val.substring(0, optn_val.length - 1);
                        optn_val=optn_val.replace('"','')
                    //   alert(optn_val);
                         $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' : </span><span class="right">'+optn_val+'</span></div>');
                         alternate_var = 1;
                    }
                    else
                    {
                    
                    $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' : </span><span class="right" style="text-align:right !important">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                    }
                    alternate_var = 0;
                }
            }
        }
        $('#lowercollapsible_resultPg').trigger('create');
        
        
        //    $('#lowercollapsible_resultPg').append('<div data-role="collapsibleset" data-theme="a" data-content-theme="a" data-iconpos="right"><div data-role="collapsible"><h3>Further Details</h3><div class="productdetail"><div class="view odd"><span class="left">Fuel Capacity:</span><span class="right">'++'</span></div><div class="view even"><span class="left">Engine Make:</span><span class="right"></span> </div><div class="view odd"><span class="left">Fuel Type:</span><span class="right"></span></div><div class="view even"><span class="left">Engine Power:</span><span class="right">'++'</span></div><div class="view even"><span class="left">Engine Number :</span><span class="right">'++'</span></div></div></div></div>')
        //    
        //    $('#lowercollapsible_resultPg').trigger('create');
        
    }
    catch(ex)
    {
        alert('ex  '+ex);
    }
    
    $.mobile.changePage("#pageProductDetails", {transition:"none"})
}


//WEB SERVICE DISPALY TRUCK INFO
function getTruckDetails_AU(truckid)
{
  try
  {
      var uuid=user.Id;
      if(uuid == '')
      {
          uuid="0";
      }
    //alert('truckid '+truckid);
    var gettrckdetails_Json={ "action":"favouriteDetail",
                              "truckID":truckid,
                              "userID":uuid
                            };
    gettrckdetails_Json=JSON.stringify(gettrckdetails_Json);
      
    
    console.log(gettrckdetails_Json+'    gettrckdetails_Json')
    
    service.ajaxCall(gettrckdetails_Json,function(result_data)
                     {
                        if(result_data.responseCode !=0)
                        {
                            displaySelectedtruckInfo(result_data);
                                //alert('sucs '+result_data+'\n'+JSON.stringify(result_data))
                            console.log('sucs  aaabba '+JSON.stringify(result_data));
                        }
                        else
                        {
                            navigator.notification.alert('Truck Information not available', function(){},'TDA','OK');
                            return;
                        }
                     },
                     function(result_data)
                     {
                        // $.mobile.changePage("#pageProductDetails", {transition:"slide"})
                         navigator.notification.alert('Cannot connect to the server', function(){},'TDA','OK');
                         console.log('failure '+JSON.stringify(result_data));
                          return;
                     });
  }
  catch(ex)
  {
      alert('GET TRUCK -err  '+JSON.stringify(ex));
  }
    
    menuClk=0;
}

/*******************************************************
 Function to display  TRUCK LIST
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/
function displayTruckList_AU(data_in)
{
    //alert('displayTruckList_AU');
    //<img src="themes/images/rightstartop.png">
    //$('#truckdetailsandPic_Au').empty();
    //'https://truckdealersaustralia.com.au/uploads/listings/'+truckId_Selctd+'/'+data_in.hits.hits[i]._source.filename1
    
    $('#container_ressearcgPage').empty();
    for(var i=0;i<data_in.hits.hits.length;i++)
    {
        
        var truckId_Selctd = data_in.hits.hits[i]._id;
        var dealer_state=data_in.hits.hits[i]._source.dealer_state;
        dealer_state =  changeStateName(dealer_state);
        
        if( dealer_state == "" || dealer_state == null || dealer_state == undefined)
        {
            dealer_state = data_in.hits.hits[i]._source.state;
            dealer_state =  changeStateName(dealer_state);
            
        }
       if(data_in.hits.hits[i]._source.hasOwnProperty('filename1'))
       {
        var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+truckId_Selctd+'/'+data_in.hits.hits[i]._source.filename1
       }
       else
       {
           imgurl="themes/images/01.png";
       }
        
        var dealerlogo_imgurl='https://truckdealersaustralia.com.au/uploads/dealers/'+data_in.hits.hits[i]._source.dealer_id +'/logo/'+data_in.hits.hits[i]._source.dealer_logo;

         try{
        if(data_in.hits.hits[i]._source.dealer_logo == "" || data_in.hits.hits[i]._source.dealer_logo == null)
        {
            var fav_unfavimgid= 'favStr_fnctlty'+truckId_Selctd;
            var type_local=data_in.hits.hits[i]._source.type
            type_local = type_local.replace(/_/g, ' ');
            type_local = capitalize(type_local);
            var yrlocal = data_in.hits.hits[i]._source.year;
            if(yrlocal == 0 || yrlocal == 'null' || yrlocal == '')
            {
                yrlocal = ' - '
            }
            var pricelocal = data_in.hits.hits[i]._source.price;
            pricelocal=addCommas(pricelocal);
            if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
            {
                pricelocal=' -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            
            
            
//            $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+data_in.hits.hits[i]._source.headline+'</h3> Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">Dealer Used</li> <li class="dealeryear">2011</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li> </ul> </div> <div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"> <li class="dealerrate">'+pricelocal+'</li> <li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul> </div> </div></div></div>');
            
            
            
            
            
            
            
            $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+data_in.hits.hits[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
            $('#container_ressearcgPage').append('<div class="clearheight"></div>');
            
             // $('#favStr_fnctlty').attr('pramTo_favFn',suc_res.truckData.truckID)
             // $('#favspandetl').attr('parmters',favourite+'_favspandetl_'+suc_res.truckData.truckID)

        }
        else
        {
            var type_local=data_in.hits.hits[i]._source.type
            type_local = type_local.replace(/_/g, ' ');
            type_local = capitalize(type_local);
             var fav_unfavimgid= 'favStr_fnctlty'+truckId_Selctd;
            var yrlocal = data_in.hits.hits[i]._source.year;
            if(yrlocal == 0 || yrlocal == 'null' || yrlocal == '')
            {
                yrlocal = '-'
            }
            var pricelocal = data_in.hits.hits[i]._source.price;
            pricelocal=addCommas(pricelocal);
            if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
            {
                pricelocal=' -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            
            
            
            
            
            
            
            $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div><div class="sliderlogo"><img width: auto; max-height: 44px !important; src="'+dealerlogo_imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+data_in.hits.hits[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar"  onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
            $('#container_ressearcgPage').append('<div class="clearheight"></div>')
        }
        
        }
        catch(ex)
        {
            alert("yjkydjklb  "+JSON.stringify(ex));
        }

    }
 //alert('page cha');
    $('#topcontainerTruckdetails').trigger('create');
//    $('#pageSearchResult').trigger('create');
     $.mobile.changePage("#pageSearchResult", {transition:"none"})
    
}


function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/*******************************************************
 Function to Save user's Searches
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/

function onConfirm(buttonIndex) {
    
    if(buttonIndex == 2  )
    {
            //        navigator.notification.alert('Your Search cannot be saved', function(){},'Truck Sales','OK');
            return;

    }
    else
    {
      //  alert('id user  '+user.Id);
        
        searchsaveJson = { "action":"saveNewSearch",
                           "userID":user.Id,
                           "searchName":"",
                           "searchQueryString":localStorage.getItem('saveSearch_truckList').split('?')[1]
        };
        searchsaveJson = JSON.stringify(searchsaveJson);
        
        service.ajaxCall(searchsaveJson,function(result_data){
                         console.log('sucs '+JSON.stringify(result_data));
                         if(result_data.responseCode == 0)
                         {
                            navigator.notification.alert('You need to be logged in to save your search', function(){},'TDA','OK');
                         }
                         else
                         {
                            navigator.notification.alert('Your search is saved ', function(){},'TDA','OK');
                         }
                    },
                    function(result_data){
                             navigator.notification.alert('Cannot Save data', function(){},'TDA','OK');
                    });
    }
    
}


function saveYrSearch_AU()
{
    if(user.Id == "" || user.Id == "0" || user.Id == 0 || user.Id == null || user.Id == undefined )
    {
        //pageLogin
        navigator.notification.alert('You need to be logged in to save your search', function(){$.mobile.changePage("#pageLogin", {transition:"none"});},'TDA','OK');
        
    }
    else
    {
        navigator.notification.confirm(
                                       'Are you sure you want to save this search', // message
                                       onConfirm,            // callback to invoke with index of button pressed
                                       'TDA',               // title
                                       ['OK','Cancel']     // buttonLabels
                                       );
    }
}


/*******************************************************
AMEED's Function to TO CHECK FAVOURITE PARAMTER
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/

function checkfavParam()
{
    
}


/*******************************************************
 AMEED's Function to FAVOURITE/ UNFAVORITE trucks
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/

//function favUnNfav()
//{
//   
//    
//}
function addTofav_AU(indata_au)
{
    var imgtochange='#favStr_fnctlty'+indata_au
    console.log('indata_au   '+indata_au);
    
    var uuid=user.Id;
    var ck_fav=0;
    if(uuid == '')
    {
        uuid="0";
    }
    if(isLoggedIn())
    {
            var fav_json={
                "action":"addFavourite",
                "userID":uuid,
                "deviceID": device.Id,
                "deviceType":device.Type,
                "truckID":indata_au
            } ;
            fav_json=JSON.stringify(fav_json);
            console.log('fav_json  - '+fav_json);
            
            service.ajaxCall(fav_json,function(res_dta)
                    {
                             console.log('result_dta'+JSON.stringify(res_dta))
                             if(res_dta.isFavourite == 1)
                             {
                                if(ck_fav == 0)
                                {
                                    navigator.notification.alert('Selected Truck  Added to favorites',function(){},'TDA','OK');
                                    $(imgtochange).attr("src","themes/images/staricon.png");
                                    $(imgtochange).trigger('create');
                                    ck_fav=1;
                                }
                                else
                                {
                                    navigator.notification.alert('Selected Truck already in the favorites list',function(){},'TDA','OK');
                                }
                             }
                             else if(res_dta.isFavourite == 2)
                             {
                                navigator.notification.alert('Selected Truck already in the favorites list',function(){},'TDA','OK');
                                ck_fav=1;
                             }
                             else
                             {
                                navigator.notification.alert('Error : Cannot save to favourites',function(){},'TDA','OK');
                                ck_fav=1;
                             }
                },
                function(res_dta)
                {
                     navigator.notification.alert('Cannot Connect to server',function(){},'TDA','OK');
                });
    }
    else
    {
        forceLogin();
    }
}


function favUnNfav()
{
    //   alert('dd'+  $('#favspandetl').attr('parmters'));
    
    var chkFv_prm = $('#favspandetl').attr('parmters').split('_')[0];
    var truckID_In_prm = $('#favspandetl').attr('parmters').split('_')[2]
    var changeid_span="#"+$('#favspandetl').attr('parmters').split('_')[1]
    //alert(chkFv_prm+truckID_In_prm+changeid_span)
    
    
    
    
    var uuid=user.Id;
    if(uuid == '')
    {
        uuid="0";
    }
    if(isLoggedIn())
    {
        if(chkFv_prm == 0)
        {
            var fav_json={
                            "action":"addFavourite",
                            "userID":uuid,
                            "deviceID": device.Id,
                            "deviceType":device.Type,
                            "truckID":truckID_In_prm
                        } ;
            fav_json=JSON.stringify(fav_json);
            console.log('fav_json  - '+fav_json);
            
            service.ajaxCall(fav_json,function(res_dta){
                             console.log('res_dta'+JSON.stringify(res_dta))
                             res_dta
                             if(res_dta.responseCode == 200)
                             {
                                if($('#favspandetl').hasClass('prorating'))
                                {
                                    $('#favspandetl').removeClass('views').removeClass('prorating');
//                                    $('#favspandetl').removeClass('prorating-change');
                                    $('#favspandetl').addClass('views').addClass('prorating-change');
                                    $('#favspandetl').trigger('create');
                                    navigator.notification.alert('Selected TruckAdded to favorites',function(){},'TDA','OK');
                             
                                }
                                 else if($('#favspandetl').hasClass('prorating-change'))
                                {
                                     navigator.notification.alert('Selected Truck already added to favorites',function(){},'TDA','OK');
                                }
                             
                             }
                             else
                             {
                                navigator.notification.alert('Cannot Add Selected TruckAdded to favorites',function(){},'TDA','OK');
                             }
                             },
                             function(res_dta)
                             {
                                console.log('Err res_dta'+JSON.stringify(res_dta))
                             });
                             
            
            
        }else
        {
            navigator.notification.alert('Already added to favorite',function(){},'TDA','OK');
            
        }
    }else
    {
        forceLogin();
    }
    
}


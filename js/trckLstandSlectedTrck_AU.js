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

function Short_StateName(short_State_id)
{
    var state_Shortform;
    switch(short_State_id)
    {
            //            console.log(state_id);
        case 'Northern Territory':
            state_Shortform='NT';
            break;
        case 'Western Australia':
            state_Shortform='WA';
            break;
        case 'New South Wales':
            state_Shortform='NSW';
            break;
        case 'Australian Capital Territory':
            state_Shortform='ACT';
            break;
        case 'Victoria':
            state_Shortform='VIC';
            break;
        case 'Queensland':
            state_Shortform='QLD';
            break;
        case 'South Australia':
            state_Shortform='SA';
            break;
        case 'Tasmania':
            state_Shortform='TAS';
            break;
        default:
            state_Shortform=short_State_id;
    }
    return state_Shortform;
}

function SendMail()
{
    
}



//
//function openPopUp()
//{
//    $('#popupParis').popup();
//    $('#popupParis').popup('open');
//    
//}


/*******************************************************
 Function to IMPLEMET SWIPE FUNCTIONALITY
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *********************************************************/
$(document).ready(function()
{
    
    $(document).on('swipeleft','#imageContainr_Slider', function()
          {
                   // alert('length '+(img_array.length)+'\n'+'img_count '+img_count+'\n'+'img = '+img_array[img_count])
            if(img_array.length > 1)
            {
                 //  $("#imageContainr_Slider").empty();
                  
                   img_count++;
                  
                   if(img_count>(img_array.length))
                   {
                        var div_imgcount=" 1 of "+img_array.length;
                   
                        if(static_logoDealer == "")
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                        }
                        else
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                        }
                   img_count = 1;
                   }
                   else
                   {
                        //alert(img_count);
                        var div_imgcount=' '+img_count+" of "+(img_array.length);
                        if(static_logoDealer == "")
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                        }
                        else
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                        }
                   }
            }
            

        });
    $(document).on('swiperight','#imageContainr_Slider', function()
                {
                   if(img_array.length > 1)
                   {
                        //$("#imageContainr_Slider").empty();
                        img_count--;
                   
                    if(img_count<=0)
                    {
                        var div_imgcount=' '+img_array.length+" of "+(img_array.length);
                        if(static_logoDealer == "")
                        {
                             $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_array.length-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                        }
                        else
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_array.length-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                        }
                     img_count = img_array.length;
                    }
                    else
                    {
                       // img_count--
                        
                        var div_imgcount=' '+img_count+" of "+(img_array.length);
                        if(static_logoDealer == "")
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                        }
                        else
                        {
                            $("#imageContainr_Slider").html('<div class="sliderimages"><img src="'+img_array[img_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                        }
                   
                   
                    }
                   }

            });
});
/*******************************************************&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*********************************************************/

/*******************************************************
 Function to DISPLAY ALL Details of a truck
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :truck id
 *********************************************************/

//$$$$$$$$$$$$$ GLOBAL ARRAY TO STORE ALL IMAGES IN DETILS PAGE &&&&&&&&&&&&&&&&&

var img_array=[];
var imgarray_lngth;
var img_count;
var static_logoDealer

function displaySelectedtruckInfo(suc_res)
{
 //alert(suc_res.truckData.street_line_1+'   '+suc_res.truckData.headline+'\n \n'+'  sucs '+JSON.stringify(suc_res));
    try
    {
        var favourite= suc_res.truckData.isFavourite;
        var addrs_seltruck='';
        if(suc_res.truckData.address.street_line_1 != '' )
        {
            addrs_seltruck = suc_res.truckData.address.street_line_1+' ,';
        }
        if(suc_res.truckData.address.street_line_2 != '' )
        {
            addrs_seltruck = addrs_seltruck+suc_res.truckData.address.street_line_2+' ,';
        }
        if( !(suc_res.truckData.address.suburb == '' || suc_res.truckData.address.suburb == 0) )
        {
            addrs_seltruck = addrs_seltruck+suc_res.truckData.address.suburb+' ,';
        }
        if(addrs_seltruck == ',0'  || addrs_seltruck == '')
        {
            addrs_seltruck = '';
        }
        //addrs_seltruck = suc_res.truckData.address.street_line_1+' ,'+suc_res.truckData.address.street_line_2+' ,'+suc_res.truckData.address.suburb
      
        
        
        var cityandcode_seltruck = suc_res.truckData.address.state+' ,'+suc_res.truckData.address.postcode;
        
        
//        alert('addrs_seltruck '+addrs_seltruck+'   '+cityandcode_seltruck);
        
        
        var telphno = 'tel:'+suc_res.truckData.dealership_phone;
        if(suc_res.truckData.dealership_phone == null || suc_res.truckData.dealership_phone == '')
        {
            if(suc_res.truckData.truckDetail.enquiry_phone == '' || suc_res.truckData.truckDetail.enquiry_phone == null)
            {
                telphno = 'N/A'
            }
            else
            {
                telphno = 'tel:'+suc_res.truckData.truckDetail.enquiry_phone;
            }
        }
        
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
        $("#imageContainr_Slider").empty();
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
            pricelocal='    -'
        }
        else
        {
            pricelocal=' $'+pricelocal;
        }
        
        
        if(suc_res.truckData.hasOwnProperty('image'))
        {
                if(suc_res.truckData.image.length>0)
                {
                    $("#imageContainr_Slider").empty();
                    
                    if(suc_res.truckData.dealer_logo == "" || suc_res.truckData.dealer_logo == null || suc_res.truckData.dealer_logo == undefined )
                    {
                        static_logoDealer = ""
                    }
                    else
                    {
                        static_logoDealer="https://truckdealersaustralia.com.au/uploads/dealers/"+suc_res.truckData.id+'/logo/'+suc_res.truckData.dealer_logo;
                    }
                    
                    img_array.length = 0;
                    
                    
                    for(var k=0;k<suc_res.truckData.image.length;k++)
                    {
                        var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+suc_res.truckData.truckID+'/'+suc_res.truckData.image[k].fileUrl;
                        console.log('imgurl:  '+imgurl);
                        img_array.push(imgurl);
                        
                    }
                    imgarray_lngth = img_array.length-1;
                    console.log('img_array     '+img_array+'     \n           dd   '+imgarray_lngth);
                    
                    var div_imgcount=" 1 of "+(img_array.length);
                    console.log(' static_logoDealer'+static_logoDealer+'\n')
                    
                    if(static_logoDealer != "")
                    {
                        $("#imageContainr_Slider").append('<div class="sliderimages" ><img src="'+img_array[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                         img_count=1;
                    }
                    else
                    {
                        
                        $("#imageContainr_Slider").append('<div class="sliderimages" ><img src="'+img_array[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                         img_count=1;
                    }
                    

                }
                else
                {
                    var div_imgcount=" 1 of 1";
                    $("#imageContainr_Slider").append('<div class="sliderimages" ><img src="themes/images/demoImg.jpeg"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                    img_count=1;
                }
                $("#imageContainr_Slider").trigger('create');
        }
        
        
        
        if(favourite == 1)
        {
            
            $('#remaingDetails_selectedTruck').append('<div class="top-leften"><span class="views prodenq" truckDet="td_'+suc_res.truckData.truckID+'_'+suc_res.truckData.truckDetail.reference_number+'_'+suc_res.truckData.headline+'_'+suc_res.truckData.truckDetail.dealerID+'" id="mailme_selectedtruck" onclick="enquiryDealAndTruck(this)"><a href="#">Enquiry</a></span><span class="views prodcall" id="callme_selectedtruck"><a href="'+telphno+'">Call</a></span><span class="views prorating-change"  onclick="favUnNfav()" id="favspandetl"></span></div><div class="mid"><ul><li class="dealername">'+type_local+'</li> <li class="dealeryear refbmk">REF: '+suc_res.truckData.truckDetail.reference_number+'</li> <li class="dealerland refbmkamt delerref">'+pricelocal+'</li></ul></div><div class="addresspoints" onclick="openMap(this)"><h3>'+addrs_seltruck+'</br>'+cityandcode_seltruck+'</h3> </div>')
            
            $('#favspandetl').attr('parmters',favourite+'_favspandetl_'+suc_res.truckData.truckID)
            
            
        }
        else //if(favourite == 0)
        {
            
            $('#remaingDetails_selectedTruck').append('<div class="top-leften"><span class="views prodenq" truckDet="td_'+suc_res.truckData.truckID+'_'+suc_res.truckData.truckDetail.reference_number+'_'+suc_res.truckData.headline+'_'+suc_res.truckData.truckDetail.dealerID+'" id="mailme_selectedtruck" onclick="enquiryDealAndTruck(this)"><a href="#">Enquiry</a></span><span class="views prodcall" id="callme_selectedtruck"><a href="'+telphno+'">Call</a></span><span class="views prorating"  onclick="favUnNfav()" id="favspandetl"></span></div><div class="mid"><ul><li class="dealername">'+type_local+'</li> <li class="dealeryear refbmk">REF: '+suc_res.truckData.truckDetail.reference_number+'</li> <li class="dealerland refbmkamt delerref">'+pricelocal+'</li></ul></div><div class="addresspoints" onclick="openMap(this)"><h3>'+addrs_seltruck+'</br>'+cityandcode_seltruck+'</h3> </div>');
            
//            alert('elsefavourite'+favourite+'   -   '+ $('#favspandetl').attr('class'))
            
            $('#favspandetl').attr('parmters',favourite+'_favspandetl_'+suc_res.truckData.truckID)
        }
        
        $('#uppercollapsible_resultPg').append('<div data-role="collapsibleset" data-theme="a" data-content-theme="a" data-iconpos="right"><div data-role="collapsible"> <h3>Description</h3> <div class="discrippragraph">'+suc_res.truckData.description+'-</div></div></div>');
        
        $('#uppercollapsible_resultPg').trigger('create');
        
        
       
        
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Year  </span><span class="right">'+suc_res.truckData.truckDetail.year+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view  odd"><span class="left">Price  </span><span class="right">'+pricelocal+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Type  </span><span class="right">'+type_local+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view  odd"><span class="left">Make  </span><span class="right">'+suc_res.truckData.truckDetail.make+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Model  </span><span class="right">'+suc_res.truckData.truckDetail.model+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Catagory  </span><span class="right">'+suc_res.truckData.truckDetail.cat_1_name+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Sub Catagory </span><span class="right">'+suc_res.truckData.truckDetail.cat_2_name+' </br>'+suc_res.truckData.truckDetail.cat_3_name+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Reference Code  </span><span class="right">'+suc_res.truckData.truckDetail.reference_number+'</span></div>');
        $('#custom_attributes_Au').append('<div class="view even"><span class="left">Serial Number </span><span class="right">'+suc_res.truckData.truckDetail.serial_number+'</span></div>');
       
        var alternate_var='even';
        
        if(suc_res.truckData.truckDetail.odometer != '0' || suc_res.truckData.truckDetail.odometer != 0 ||suc_res.truckData.truckDetail.odometer.trim() != '' || suc_res.truckData.truckDetail.odometer != 'N/A')
        {
            
        }
        else
        {
            $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Odometer  </span><span class="right">'+suc_res.truckData.truckDetail.odometer+'</span></div>');
            alternate_var = 'odd';
        }
        
        if(suc_res.truckData.truckDetail.engine_capacity != '0' || suc_res.truckData.truckDetail.engine_capacity != 0 || suc_res.truckData.truckDetail.engine_capacity.trim() != '' || suc_res.truckData.truckDetail.engine_capacity != 'N/A')
        {

        }
        else
        {
            if( alternate_var = 'even')
            {
                $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Engine Capacity  </span><span class="right">'+suc_res.truckData.truckDetail.engine_capacity+'</span></div>');
                 alternate_var = 'odd';
            }
            else
            {
                $('#custom_attributes_Au').append('<div class="view even"><span class="left">Engine Capacity  </span><span class="right">'+suc_res.truckData.truckDetail.engine_capacity+'</span></div>');
                alternate_var = 'even';
            }
        }
        
        if(suc_res.truckData.truckDetail.engine_power!= '0' || suc_res.truckData.truckDetail.engine_power!= 0 ||suc_res.truckData.truckDetail.engine_power.trim() != '' || suc_res.truckData.truckDetail.engine_power != 'N/A')
        {
            
        }
        else
        {
            if(alternate_var == 'even')
            {
                $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Engine Power  </span><span class="right">'+suc_res.truckData.truckDetail.engine_power+'</span></div>');
                alternate_var = 'odd';
            }
            else
            {
                $('#custom_attributes_Au').append('<div class="view even"><span class="left">Engine Power  </span><span class="right">'+suc_res.truckData.truckDetail.engine_power+'</span></div>');
                alternate_var = 'even';
            }

        }
        
        if(suc_res.truckData.truckDetail.vin != '0' || suc_res.truckData.truckDetail.vin != 0 || suc_res.truckData.truckDetail.vin.trim() != '' || suc_res.truckData.truckDetail.vin != 'N/A')
        {
            
        }
        else
        {
            if(alternate_var == 'even')
            {
                $('#custom_attributes_Au').append('<div class="view odd"><span class="left">VIN  </span><span class="right">'+suc_res.truckData.truckDetail.vin+'</span></div>');
                alternate_var = 'odd';
            }
            else
            {
                $('#custom_attributes_Au').append('<div class="view even"><span class="left">VIN  </span><span class="right">'+suc_res.truckData.truckDetail.vin+'</span></div>');
                alternate_var = 'even';
            }

        }
        
        if(suc_res.truckData.truckDetail.gcm != '0' || suc_res.truckData.truckDetail.gcm != 0 || suc_res.truckData.truckDetail.gcm.trim() != '' || suc_res.truckData.truckDetail.gcm != 'N/A')
        {
            
        }
        else
        {
            if(alternate_var =='even')
            {
                $('#custom_attributes_Au').append('<div class="view odd"><span class="left">GCM  </span><span class="right">'+suc_res.truckData.truckDetail.gcm+'</span></div>');
                alternate_var = 'odd';
            }
            else
            {
                $('#custom_attributes_Au').append('<div class="view even"><span class="left">GCM  </span><span class="right">'+suc_res.truckData.truckDetail.gcm+'</span></div>');
                alternate_var = 'even';
            }

        }
        
//        if(suc_res.truckData.truckDetail.registration_date.substring(0, 2) != '00')
//        {
//           
//            
//        }
//        else
//        {
//            if(alternate_var == 'even')
//            {
//                $('#custom_attributes_Au').append('<div class="view odd"><span class="left">Registration_date  </span><span class="right">'+suc_res.truckData.truckDetail.registration_date.substring(0, 10) +'</span></div>');
//                alternate_var = 'odd';
//            }
//            else
//            {
//                $('#custom_attributes_Au').append('<div class="view even"><span class="left">Registration_date  </span><span class="right">'+suc_res.truckData.truckDetail.registration_date.substring(0, 10) +'</span></div>');
//                alternate_var = 'even';
//            }
//        }
        
        $('#middlecollapsible_resultPg').trigger('create');
        alternate_var = 'odd';
        for(var i=0;i<suc_res.truckData.furtherDetail.length;i++)
        {
            if(alternate_var == 'odd')
            {
                if(suc_res.truckData.furtherDetail[i].value != '')
                {
                    if(suc_res.truckData.furtherDetail[i].name == "Options")
                    {
                        var values_op=suc_res.truckData.furtherDetail[i].value;
                        
                        values_op = values_op.replace(/[\[\]']+/g,'');
                        values_op = values_op.replace(/['"]+/g, '')  
                        console.log(values_op+values_op);
                        
                     if(alternate_var == 'odd')
                     {
                        $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+values_op+'</span></div>');
                        alternate_var = 'even'
                      }
                      else
                      {
                          $('#further_detailsa').append('<div class="view odd"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+values_op+'</span></div>');
                          alternate_var = 'odd'
                      }

                    }
                    else
                    {
                       if(alternate_var == 'odd')
                       {
                          $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                          alternate_var = 'even';
                       }
                       else{
                          $('#further_detailsa').append('<div class="view odd"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                           alternate_var = 'odd';
                      }
                    }
                }
            }
            else
            {
                if(suc_res.truckData.furtherDetail[i].value != '')
                {
                    if(suc_res.truckData.furtherDetail[i].name == "Options")
                    {
                       var values_op=suc_res.truckData.furtherDetail[i].value;
                     
                       values_op = values_op.replace(/[\[\]']+/g,'');
                       values_op = values_op.replace(/['"]+/g, '')
                       if(alternate_var == 'odd')
                       {
                         $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+values_op+'</span></div>');
                          alternate_var = 'even';
                       }
                       else{
                             $('#further_detailsa').append('<div class="view odd"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right">'+values_op+'</span></div>');
                            alternate_var = 'odd';
                      }
                    }
                    else
                    {
                                                       
                       if(alternate_var == 'odd')
                       {
                            $('#further_detailsa').append('<div class="view even"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right" style="text-align:right !important">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                             alternate_var = 'even';
                      }
                      else{
                        $('#further_detailsa').append('<div class="view odd"><span class="left">'+suc_res.truckData.furtherDetail[i].name+' </span><span class="right" style="text-align:right !important">'+suc_res.truckData.furtherDetail[i].value+'</span></div>');
                        alternate_var = 'odd';
                      }
                    }
                   
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
    if(page==2){
      
    $('#container_ressearcgPage').empty();
    }else if(page==0){
        return;
    }
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
           imgurl="themes/images/demoImg.jpeg";
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
                pricelocal='      -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            var catgrytoPalce = data_in.hits.hits[i]._source.cat_1_name;
            catgrytoPalce = catgrytoPalce.trim();
            catgrytoPalce = catgrytoPalce+'/'+(data_in.hits.hits[i]._source.cat_2_name).trim();
            if( data_in.hits.hits[i]._source.hasOwnProperty('cat_3_name'))
            {
               if( data_in.hits.hits[i]._source.cat_3_name != '' || data_in.hits.hits[i]._source.cat_3_name != null)
               {
                  catgrytoPalce = catgrytoPalce+'/'+(data_in.hits.hits[i]._source.cat_3_name).trim();
               }
            }
            if(catgrytoPalce.slice(-1) == '/')
            {
                catgrytoPalce = catgrytoPalce.substring(0, catgrytoPalce.length - 1);
            }
         $('#container_ressearcgPage').append('<li class="topcoat-list__item"><div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+data_in.hits.hits[i]._source.headline+'</h3>'+catgrytoPalce+'</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
            $('#container_ressearcgPage').append('<div class="clearheight"></div></li><div class="clearheight"></div>');
            
             // $('#favStr_fnctlty').attr('pramTo_favFn',suc_res.truckData.truckID)truckId_Selctd
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
                yrlocal = ' -'
            }
            var pricelocal = data_in.hits.hits[i]._source.price;
            pricelocal=addCommas(pricelocal);
            if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
            {
                pricelocal='    -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            
            var catgrytoPalce = data_in.hits.hits[i]._source.cat_1_name;
            catgrytoPalce = catgrytoPalce.trim();
            catgrytoPalce = catgrytoPalce+'/'+(data_in.hits.hits[i]._source.cat_2_name).trim();
            if( data_in.hits.hits[i]._source.hasOwnProperty('cat_3_name'))
            {
               if( data_in.hits.hits[i]._source.cat_3_name != '' || data_in.hits.hits[i]._source.cat_3_name != null)
               {
                    catgrytoPalce = catgrytoPalce+'/'+(data_in.hits.hits[i]._source.cat_3_name).trim();
               }
            }
                                                       
            if(catgrytoPalce.slice(-1) == '/')
            {
                catgrytoPalce = catgrytoPalce.substring(0, catgrytoPalce.length - 1);
            }
            
            $('#container_ressearcgPage').append('<li class="topcoat-list__item"><div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')"></div><div class="sliderlogo"><img width: auto; max-height: 44px !important; src="'+dealerlogo_imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+data_in.hits.hits[i]._source.headline+'</h3>'+catgrytoPalce+'</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar"  onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
            $('#container_ressearcgPage').append('<div class="clearheight"></div></li><div class="clearheight"></div>')
        }
        
        }
        catch(ex)
        {
            alert("yjkydjklb  "+(ex));
        }

    }
    $('#topcontainerTruckdetails').trigger('create');
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
        //navigator.notification.alert('You need to be logged in to save your search', function(){$.mobile.changePage("#pageLogin", {transition:"none"});},'TDA','OK');
                                                         forceLogin();
        
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
                             if(res_dta.isFavourite == 1){
                                    $('body').find('.favcount').each(function(){
                                                              $(this).html(res_dta.totalFavourites);
                                                              });
                             
                             
                                if(ck_fav == 0)
                                {
                                    navigator.notification.alert('Selected Truck  Added to favourites',function(){},'TDA','OK');
                                    $(imgtochange).attr("src","themes/images/staricon.png");
                                    $(imgtochange).trigger('create');
                                    ck_fav=1;
                                }
                                else
                                {
                                    navigator.notification.alert('Selected Truck already in the favourites list',function(){},'TDA','OK');
                                    var unfavJson =  {
                                        "action"  :"removeFavourite",
                                        "userID"  :uuid,
                                        "deviceID":device.Id,
                                        "deviceType":device.Type,
                                        "truckID": indata_au
                                    }
                                    unfavJson = JSON.stringify(unfavJson);
                                    service.ajaxCall(unfavJson,function(res_dta)
                                            {
                                              if(res_dta.responseCode== '200')
                                              {
                                                     $('body').find('.favcount').each(function(){
                                                                               $(this).html(res_dta.totalFavourites);
                                                                               });
                                                     navigator.notification.alert('Selected Truck removed from favourites list',function(){},'TDA','OK');
                                                     $(imgtochange).attr("src","themes/images/starrating.png");
                                                     $(imgtochange).trigger('create');
                                                     ck_fav=0;
                                              }
                                            },
                                            function(res_dta)
                                            {
                                              navigator.notification.alert('Error : Cannot save to favourites',function(){},'TDA','OK');
                                              ck_fav=0;
                                            });

                                }
                             }
                             else if(res_dta.isFavourite == 2)
                             {
                                //navigator.notification.alert('Selected Truck already in the favorites list',function(){},'TDA','OK');
                                //ck_fav=1;
                                var unfavJson =  {
                                        "action"  :"removeFavourite",
                                        "userID"  :uuid,
                                        "deviceID":device.Id,
                                        "deviceType":device.Type,
                                        "truckID": indata_au
                                    }
                                unfavJson = JSON.stringify(unfavJson);
                                service.ajaxCall(unfavJson,function(res_dta)
                                            {
                                                if(res_dta.responseCode== '200')
                                                 {
                                                        $('body').find('.favcount').each(function(){
                                                                                  $(this).html(res_dta.totalFavourites);
                                                                                  });
                                                    navigator.notification.alert('Selected Truck removed from favorites list',function(){},'TDA','OK');
                                                    $(imgtochange).attr("src","themes/images/starrating.png");
                                                    $(imgtochange).trigger('create');
                                                    ck_fav=0;
                                                 }
                                            },
                                            function(res_dta)
                                            {
                                              navigator.notification.alert('Error : Cannot save to favourites',function(){},'TDA','OK');
                                              ck_fav=0;
                                            });
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
                             $('body').find('.favcount').each(function(){
                                                              $(this).html(res_dta.totalFavourites);
                                                              });
                             if(res_dta.responseCode == 200)
                             {
                                if($('#favspandetl').hasClass('prorating'))
                                {
                                    $('#favspandetl').removeClass('views').removeClass('prorating');
//                                    $('#favspandetl').removeClass('prorating-change');
                                    $('#favspandetl').addClass('views').addClass('prorating-change');
                                    $('#favspandetl').trigger('create');
                                    navigator.notification.alert('Selected Truck Added to favorites',function(){},'TDA','OK');
                                    chkFv_prm = 1;
                                    $('#favspandetl').attr('parmters',chkFv_prm+'_favspandetl_'+truckID_In_prm)
                             
                                }
                                 else if($('#favspandetl').hasClass('prorating-change'))
                                {
                                     //navigator.notification.alert('Selected Truck already added to favorites',function(){},'TDA','OK');
                                     var unfavJson =  {
                                                        "action"  :"removeFavourite",
                                                        "userID"  :uuid,
                                                        "deviceID":device.Id,
                                                        "deviceType":device.Type,
                                                        "truckID":truckID_In_prm
                                                    }
                                        unfavJson = JSON.stringify(unfavJson);
                                        service.ajaxCall(unfavJson,function(res_dta)
                                                            {
                                                                if(res_dta.responseCode== '200')
                                                                {
                                                                    $('body').find('.favcount').each(function(){
                                                                                          $(this).html(res_dta.totalFavourites);
                                                                    });
                                                                    navigator.notification.alert('Selected Truck removed from favorites list',function(){},'TDA','OK');
                                                                    $('#favspandetl').removeClass('views').removeClass('prorating-change');
                                                                    $('#favspandetl').addClass('views').addClass('prorating');
                                                                    $('#favspandetl').trigger('create');
                                                                    //ck_fav=0;
                                                                    $('body').find('.favcount').each(function(){
                                                                                                $(this).html(res_dta.totalFavourites);
                                                                                          });
                                                         
                                                         chkFv_prm = 0;
                                                         $('#favspandetl').attr('parmters',chkFv_prm+'_favspandetl_'+truckID_In_prm)


                                                                }
                                                            },
                                                            function(res_dta)
                                                            {
                                                                navigator.notification.alert('Error : Cannot save to favourites',function(){},'TDA','OK');
                                                                //ck_fav=0;
                                                            });

                                }
                             
                             }
                             else
                             {
                                navigator.notification.alert('Cannot Add Selected Truck Added to favorites',function(){},'TDA','OK');
                             }
                             },
                             function(res_dta)
                             {
                                console.log('Err res_dta'+JSON.stringify(res_dta))
                             });
                             
            
            
        }else
        {
           // navigator.notification.alert('Already added to favorite',function(){},'TDA','OK');
            var unfavJson =  {
                               "action"  :"removeFavourite",
                               "userID"  :uuid,
                               "deviceID":device.Id,
                               "deviceType":device.Type,
                               "truckID":truckID_In_prm
                              }
            unfavJson = JSON.stringify(unfavJson);
            service.ajaxCall(unfavJson,function(res_dta)
            {
                             if(res_dta.responseCode== '200')
                              {
                                   $('body').find('.favcount').each(function(){
                                             $(this).html(res_dta.totalFavourites);
                             });
                             navigator.notification.alert('Selected Truck removed from favorites list',function(){},'TDA','OK');
                             $('#favspandetl').removeClass('views').removeClass('prorating-change');
                             $('#favspandetl').addClass('views').addClass('prorating');
                             $('#favspandetl').trigger('create');
                                                                        //ck_fav=0;
                             $('body').find('.favcount').each(function(){
                                       $(this).html(res_dta.totalFavourites);
                                        });
                             chkFv_prm = 0;
                             $('#favspandetl').attr('parmters',chkFv_prm+'_favspandetl_'+truckID_In_prm)

                              }
                            },
                            function(res_dta)
                            {
                                 navigator.notification.alert('Error : Cannot save to favourites',function(){},'TDA','OK');
                                                                        //ck_fav=0;
                             });
                                            
            
        }
    }else
    {
        forceLogin();
    }
    
}
//Function TO Remove favourite
                                                       
function remFav()
{
    
}
                                                       


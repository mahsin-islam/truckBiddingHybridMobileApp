
var postCode={"SA":{"state":"South Australia", "post":"5000", "lat":"-34.932829","long":"138.603813"},
    "VIC":{"state":"Victoria", "post":"3000", "lat":"-37.815206","long":"144.963937"},
    "NSW":{"state":"New South Wales", "post":"1000", "lat":"-35.317349","long":"149.135308"},
    "ACT":{"state":"Australian Capital Territory", "post":"0200", "lat":"","long":""},
    "QLD":{"state":"Queensland", "post":"4000", "lat":"-27.466099","long":"153.023588"},
    "WA":{"state":"Western Australia", "post":"6000", "lat":"-31.952574","long":"115.861049"},
    "TAS":{"state":"Tasmania", "post":"7000", "lat":"-42.878332","long":"147.322114"},
    "NT":{"state":"Northern Territory", "post":"0800", "lat":"-12.461497","long":"130.844989"}
}


// Find dealers
var fixedPost, dealerQry, dealPg,numOfDealPg;

function navDealerResult(){
    dealPg=1;
  var urL='https://truckdealersaustralia.com.au/api/dealers/?';
    if($('#fdKeyword').val().length>0&&$('#fdKeyword').val().length>30){
        navigator.notification.alert('Keyword should be less than 30 characters',function(){},'TDA','OK');
        return;
    }
    if($('#fdKeyword').val().length>0&&$('#fdKeyword').val()!=''){
        //urL+='keywords='+$('#fdKeyword').val()+'&';
        urL+='keyword='+$('#fdKeyword').val()+'&';
    }
   if($('#fdPostCode').val().length>0&&$('#fdPostCode').val()!=''){
      // localStorage.setItem('isPostCode',$('#fdPostCode').val());
        urL+='postcode='+$('#fdPostCode').val()+'&';
        fixedPost = $('#fdPostCode').val();
    }
    if($('#fdSelectState').val()>=0){
        //urL+='state='+$("#fdSelectState option:selected").text();;
        urL+='state='+Short_StateName($("#fdSelectState option:selected").text())+'&';
    }
    console.log('urL ----'+urL)
    dealerQry=urL;
    urL+='page=1';
    service.ajaxget(urL, displayDealerResults, function(err){
                   // alert(JSON.stringify(err));
                    })
}


function addMoreDealers(){
   // alert(dealPg+"     "+numOfDealPg);
    if(numOfDealPg==1){
        console.log('if  ');
        return;
    }else if(numOfDealPg<dealPg){
        console.log(' else  ');
        return;
        
    }
    var urL=dealerQry+'page='+dealPg;
   
    console.log('urL ----'+urL)
    //alert(urL);
    service.ajaxget(urL, displayDealerResults, function(err){
                    // alert(JSON.stringify(err));
                    })
}


// Display find dealer results
function displayDealerResults(resData){
    //alert(fixedPost);
    var abcbac = '';
    if(dealPg==1){
         $('#fDealerResult').empty();
    }
   // alert(resData.results.hits.total);
    var totDelaers=resData.results.hits.total;
    numOfDealPg=Math.ceil(totDelaers/100);
    if(numOfDealPg>0&&numOfDealPg>=dealPg){
        dealPg++;
    }
    
   
    $.mobile.changePage("#pageDealerResult")
    var res=resData.results.hits.hits;
     console.log("ijkujpk  "+JSON.stringify(res));
   // alert(res.length);
    var latitude; var longitude;
      var dealerHtml="";
    for(var i=0;i<res.length;i++){
        //////////////////////
            var geocoder = new google.maps.Geocoder();
            var address="";
            var fromPost=""
            var staTe=res[i]._source.state;
            if(staTe=='WA'){
             address = ''+postCode.WA.state+' '+postCode.WA.post+'';
            fromPost=postCode.WA.post;
                latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }else if(staTe=='SA'){
            address = ''+postCode.SA.state+' '+postCode.SA.post+'';
            fromPost=postCode.SA.post;
           latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }else if(staTe=='QLD'){
            address = ''+postCode.QLD.state+' '+postCode.QLD.post+'';
            fromPost=postCode.QLD.post;
           latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }else if(staTe=='NSW'){
            address = ''+postCode.NSW.state+' '+postCode.NSW.post+'';
            fromPost=postCode.NSW.post;
           latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }else if(staTe=='TAS'){
            address = ''+postCode.TAS.state+' '+postCode.TAS.post+'';
            fromPost=postCode.TAS.post;
           latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }else if(staTe=='NT'){
            address = ''+postCode.NT.state+' '+postCode.NT.post+'';
            fromPost=postCode.NT.post;
           latitude=postCode.WA.lat; longitude=postCode.WA.long;        }
        else if(staTe=='VIC'){
            address = ''+postCode.VIC.state+' '+postCode.VIC.post+'';
            fromPost=postCode.NT.post;
            latitude=postCode.WA.lat; longitude=postCode.WA.long;
        }
        var dist='';
       // alert('lat '+latitude+ '  long  : '+longitude+' l1: '+res[i]._source.latitude+' l2 '+res[i]._source.longitude);
    console.log('lat '+latitude+ '  long  : '+longitude+' l1: '+res[i]._source.latitude+' l2 '+res[i]._source.longitude);

        var radlat1 = Math.PI * latitude/180;
        var radlat2 = Math.PI * res[i]._source.latitude/180
        var radlon1 = Math.PI * longitude/180;
        var radlon2 = Math.PI * res[i]._source.longitude/180
        var theta = longitude-res[i]._source.longitude;
        var radtheta = Math.PI * theta/180
        dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515
        dist = ''+dist * 1.609344+''
       // alert(dist+''+typeof dist)
        if(dist.indexOf('.') != -1){
            //alert("no dash found.");
            dist=dist.split('.')[0];
        }

        // find km from two lat long
        //////////////////////
        var dealerlogo_imgurl='https://truckdealersaustralia.com.au/uploads/dealers/'+res[i]._source.id +'/logo/'+res[i]._source.dealer_logo;
        try{
            dealerHtml+='<div class="clearheight"></div><div class="mainform delear-result clearfix">';
            dealerHtml+='<div class="truckresult"><div class="view-rows truckimage">';
            dealerHtml+='<img src="'+dealerlogo_imgurl+'" dealerId="'+res[i]._source.uid+'" onclick="getTrucksOfDealer(this)"></div>';
            console.log('ddddddddgsdfgf   '+fixedPost )
            
            if( fixedPost != undefined)
            {
                if( fixedPost != '' && fixedPost != null  && fixedPost != undefined)
                {
                    abcbac = dist+' Km from '+fixedPost;
                    console.log('a1')
                    console.log('ddddddddgsdfgfsdgsfdg gjsdghsagdh sghgd ghsdgh')
                    dealerHtml+='<div class="view-rows truckname"><h3>'+res[i]._source.dealership_name+'</h3>'+abcbac+'</div>';
                    
                }
                else
                {
                    abcbac ='';
                    console.log('a2'+abcbac)
                    dealerHtml+='<div class="view-rows truckname"><h3>'+res[i]._source.dealership_name+'</h3>'+abcbac+'</div>';
                                  }
                
            }
            else
            {
                console.log('a3')
                abcbac ='';
                dealerHtml+='<div class="view-rows truckname"><h3>'+res[i]._source.dealership_name+'</h3>'+abcbac+'</div>';
            }
            
            dealerHtml+='<div class="view-rows email-callbtn clearfix" ><a onclick="dealerEnquiry()" class="ui-btn button-email">';
            dealerHtml+='<span>EMAIL</span></a>';
            dealerHtml+='<a href="tel:'+res[i]._source.dealership_phone+'" class="ui-btn button-call"><span>CALL</span></a></div>';
            dealerHtml+='<div class="view-rows truckaddress clearfix" onclick="openMap(this)"><span>'+res[i]._source.suburb+', '+res[i]._source.state+', '+res[i]._source.postcode+'</span> </div></div></div>';
            
          }catch(e){
              alert("ex : "+JSON.stringify(e));
          }
 
    }
    $('#fDealerResult').empty();
    $('#fDealerResult').append(dealerHtml);
    console.log('new  '+dealerHtml)
    if( $('#fDealerResult').html()=='')
    {
         navigator.notification.alert('No listings matched your specific search criteria.', function(){},'TDA','OK');
        
    }
   // alert('chang');
    
    
}

$(document).on('pagehide','#pageDealerResult',function(){
               
               fixedPost='';
               $('#fdPostCode').val('');
               $('#fdKeyword').val('');
});

// Search by clicking state on map
function searchDealerByState(th){
      //  alert($(th).attr('title'));
 //   localStorage.removeItem('isPostCode');
     var urL='https://truckdealersaustralia.com.au/api/dealers/?state='+$(th).attr('title')+'';
     service.ajaxget(urL, displayDealerResults, function(){})
    
}

var pg=0;
// Load countries
$(document).on('pageshow','#pageFindScreen', function(){
             // alert(pg);
               if(pg<1){
                    $('map').imageMapResize();
               }
               pg++;
        var getstates_Json={
               "action":"getState"
            };
        getstates_Json=JSON.stringify(getstates_Json);
        console.log('getstates_Json -- '+getstates_Json);
        service.ajaxCall(getstates_Json,
                         
                function(result_data){
                    try{
                         if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.'){
//                         alert(result_data.States.length);
                         //alert(JSON.stringify(result_data.States))
                                $('#fdSelectState').empty();
                                $('#fdSelectState').append(' <option value="-1">Select state</option>');
                         var i=0;
                         $.each(result_data.States, function(idxa, obja){
                               // alert(obja);
                            $('#fdSelectState').append('<option value="'+i+'">'+obja+'</option>');
                                i++;
                        });
                       //  alert($('#fdSelectState').html())
                         $('#fdSelectState').selectmenu('refresh')
                        // alert($('#fdSelectState').html())
                      }
                    }catch(e){
                         
                         
                    }

                         
                }, function(){
                         
                         
                })
               
  //  }, 1000)
})

// Get all truck of particular dealer
function getTrucksOfDealer(el){
    
    var dealerId=$(el).attr('dealerId')
    //alert(dealerId);
    if(loginstatus==0){
        userId="0";
    }else{
        userId=localStorage.getItem("userId")
    }
    var data={
        "action": "dealerDetail_for_Favourite",
        "dealerID": dealerId, //"890",//$(el).attr('dealerId'),
        "userID":userId
    }
    localStorage.setItem('DealerEnq',$(el).attr('dealerId'))
    console.log('data -- '+JSON.stringify(data));
    service.ajaxCall(JSON.stringify(data), displayTrucksOfDealer, function(err){
                    // alert('err getTrucksOfDealer  '+JSON.stringify(err));
    })
    
}

//Display all tructs of a particular dealer
function displayTrucksOfDealer(resData){
console.log('displayTrucksOfDealer ' +JSON.stringify(resData)+' test');
    $.mobile.changePage("#pageDealerInfo", {transition:"none"})
    if(resData.responseCode==200){
        var res=resData.dealerData;
            var dealDet="";
           var dealerlogo_imgurl='https://truckdealersaustralia.com.au/uploads/dealers/'+res.id+'/logo/'+res.dealer_logo+'';
//alert(dealerlogo_imgurl);
            console.log("alert(dealerlogo_imgurl);  "+dealerlogo_imgurl);
            $('#dealTruckList').empty();
            dealDet+='<div class="images-t  clearfix"><img src="'+dealerlogo_imgurl+'"></div>';
            dealDet+='<h3>'+res.dealership_name+'</h3><div class="abnive clearfix">'
            dealDet+='<div  class="views left"><span class="left-view">ABN:</span><span class="right-view">'+res.abn+'</span>';
            dealDet+='</div><div  class="views right"><span class="left-view">LMVD:</span><span class="right-view">'+res.license_number+'</span></div></div>';
            dealDet+='<div class="truckbton clearfix"><a href="#" class="ui-btn button-enwuery" onclick="dealerEnquiry()"><span>Enquiry</span></a>';
            //dealDet+='<a href="sms:'+res.sms_phone+'" class="ui-btn button-sms"><span>SMS</span></a>';
            dealDet+='<a href="tel:'+res.dealership_phone+'" class="ui-btn button-call"><span>Call</span></a></div>';
            dealDet+='<div class="mapdealr clearfix" id="dealerMap"></div><div class="dealInfo"><div class="addresspoints clearfix" onclick="openMap(this)">';
            dealDet+='<h3>'+res.dealership_name+', '+res.suburb+', '+res.state+', '+res.postcode+' </h3></div><div class="attributesform">';
            if(res.dealer_content==null||res.dealer_content==''){
            
            
            }else{
                dealDet+='<div class="view-row clearfix" data-role="collapsible" data-iconpos="right" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h4>Details</h4><p style="padding-left: 2% !important;">'+res.dealer_content+'</p></div>';
            
            }
            dealDet+='<div class="view-row clearfix" data-role="collapsible" data-iconpos="right" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h4>Sales Representatives</h4>';
        
            for(i=0;i<res.sales.length;i++)
            {
                //alert(res.sales[i].name+':'+res.sales[i].phone);
                dealDet+='<p style="padding-left: 2% !important;">'+res.sales[i].name+':'+res.sales[i].phone+'</p>';
                //dealDet+='<div class="view-row clearfix" data-role="collapsible" data-iconpos="right" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h4>Sales Representatives</h4><p style="padding-left: 2% !important;">'+res.sales[i].name+':'+res.sales[i].phone+'</p></div></div>';
            }
            dealDet+='</div></div>';
        
         if(res.dealerTruckListing!=null){
            for(var i=0;i<res.dealerTruckListing.length;i++){
                
                var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+res.dealerTruckListing[i].id+'/'+res.dealerTruckListing[i].Images.imageName

                    dealDet+='<div class="clearheights"></div><div class="truckparts"><div class="view-rows clearfix"><div class="leftpart">';
                    dealDet+='<span class="images"><img src="'+imgurl+'"></span><span class="imagedis"><h3 class="trucktitle">'+(res.dealerTruckListing[i].headline.length < 22 ? res.dealerTruckListing[i].headline : res.dealerTruckListing[i].headline.substr(0, 22) + '<br>'+res.dealerTruckListing[i].headline.substr(22, res.dealerTruckListing[i].headline.length))+'</h3>';
                
//                (res.dealerTruckListing[i].headline.length < 22 ? res.dealerTruckListing[i].headline : res.dealerTruckListing[i].headline.substr(0, 22) + '<br>'+res.dealerTruckListing[i].headline.substr(22, res.dealerTruckListing[i].headline.length))
                    dealDet+='<span class="discrip clearfix">';
                    var cat=''
                    if(res.dealerTruckListing[i].cat_1_name!=''){
                        cat+=res.dealerTruckListing[i].cat_1_name;
                    }
                    if(res.dealerTruckListing[i].cat_2_name!=''){
                        cat+='/'+res.dealerTruckListing[i].cat_2_name;
                    }
                    if(res.dealerTruckListing[i].cat_3_name!=''){
                        cat+='/'+res.dealerTruckListing[i].cat_3_name;
                    }
                
                    var newCat=(cat.length < 22 ? cat : cat.split('/')[0]+'/'+cat.split('/')[1])
                    dealDet+=newCat;
                    dealDet+='</span><span class="truckprice">$'+res.dealerTruckListing[i].price+'</span></span></div><div class="rightpart"><div id="dTruck_'+res.dealerTruckListing[i].id+'" onclick="isTruckFavourite(this.id)" class="greenstar"><a href="#">';
                    if(res.dealerTruckListing[i].isFavourite==0)
                            dealDet+='<img src="themes/images/leftfavourate.png" fav="0"></a></div>';
                    else
                            dealDet+='<img src="themes/images/rightstartop.png" fav="1"></a></div>';
                // dealDet+='';
                dealDet+='<div class="redarrow" onclick="getTruckDetails_AU('+res.dealerTruckListing[i].id+')"><a href="#"><img src="themes/images/rightstararrow.png"></a></div></div></div></div>';
                // leftfavourate
            }
        }
         dealDet+='</div>';
        $('#dealTruckList').append(dealDet);
        $('#dealTruckList').trigger('create');
/* Map and Marker code */
        try{
                var myCenter=new google.maps.LatLng(res.latitude,res.longitude);
                var mapProp = {
                        center:myCenter,
                        zoom:8,
                        disableDefaultUI: true,
                        panControl: false,
                        zoomControl: false,
                        scaleControl: true,
                        mapTypeId:google.maps.MapTypeId.ROADMAP
                    };
        
                var map=new google.maps.Map(document.getElementById("dealerMap"),mapProp);
                var marker=new google.maps.Marker({
                                          position:myCenter,
                    });
        
                marker.setMap(map);
        }catch(e){
         //alert("err : "+JSON.stringify(e))
        }
        $('#dealTruckList').trigger('create');
/* Map and Marker code close */
     
    }else{
        navigator.notification.alert('Dealer Id is not Valid',notifySuccess,'TDA','OK');
    }
    
}

/* Is logged in or not */

function isLoggedIn(){
    if(loginstatus==1&&localStorage.getItem('userId')){
        return true;
    }else{
        return false;
    }
    
}


/* Force Login */
function forceLogin(){
    navigator.notification.confirm('Please Login to perform this action!', // message
                                   function(buttonIndex) {
                                   if(buttonIndex==1){
                                   $.mobile.changePage("#pageLogin", {transition:"none"})
                                   }else{
                                   return;
                                   }
                                   // alert('You selected button ' + buttonIndex);
                                   },            // callback to invoke with index of button pressed
                                   'TDA',           // title
                                   ['Login','Cancel']     // buttonLabels
                                   );
}


/* check if truck is favourite or not and add to fav*/
function isTruckFavourite(favId){
   // alert($('#'+favId).find('img').attr('fav'))
  //  alert(isLoggedIn());
    if(isLoggedIn()){
        if($('#'+favId).find('img').attr('fav')==0){
                addFavorite(favId.split('_')[1], function(res){
                            if(res.responseCode==200){
                                    if(res.isFavourite==1){
                                      //  alert('fav suc : '+JSON.stringify(res));
                                        $('#'+favId).find('img').attr('src','themes/images/rightstartop.png')
                                        $('#'+favId).find('img').attr('fav','1');
                                    }else if(res.isFavourite==2){
                                        navigator.notification.alert('Already added to favorite.',notifySuccess,'TDA','OK');
                                        $('#'+favId).find('img').attr('fav','1');
                            
                                }else{
                                            navigator.notification.alert('Failed to add to favorite.',notifySuccess,'TDA','OK');
                                    }
                            }
                    },
                    function(err){             // Error Callback
                               // alert('fav err : '+JSON.stringify(err));
                            navigator.notification.alert('Cannot add to favorite this time. Please try again later.',notifySuccess,'TDA','OK');
                    
                    })
        }else{
                //navigator.notification.alert('Already added to favorite',notifySuccess,'TDA','OK');
           // alert('else');
                removefv(favId.split('_')[1],
                     function(res){
                         console.log(JSON.stringify(res));// succes callback
                            if(res.responseCode==200){
                                if(res.delFavourite==1){
                                    $('#'+favId).find('img').attr('src','themes/images/leftfavourate.png')
                                    $('#'+favId).find('img').attr('fav','0');
                         
                                }else if(res.delFavourite==0){
                                    navigator.notification.alert('Cannot remove from favorite this time. Please try again later.',notifySuccess,'TDA','OK');
                                }

                         }
                     
                     },
                     function(err){ // error callback
                                console.log(JSON.stringify(err));
                     
                     });
        
        }
    }else{
        forceLogin();
    }
    
}



// Enquiry for dealer and trucks
function enquiryDealAndTruck(eqId){
    var detArr=$(eqId).attr('truckDet').split('_');
   // alert($(eqId).attr('truckDet'));
  //  alert(detArr[0]+'  '+detArr[1]+'   '+detArr[2]+'   '+detArr[3]);
    localStorage.setItem('dealId',$(eqId).attr('truckDet'));
     $.mobile.changePage("#pageEnquery", {transition:"none"})
     localStorage.setItem('enqType','truck');
    
}

function dealerEnquiry(){
  //  alert(localStorage.getItem('DealerEnq'));
    $.mobile.changePage("#pageEnquery", {transition:"none"})
    localStorage.setItem('enqType','dealer');
    
}


function sendEnquiry(){
    if(localStorage.getItem('enqType')=='truck'){
       var truckDetArr=localStorage.getItem('dealId').split('_');
       // alert(truckDetArr[0]+'  '+truckDetArr[1]+'   '+truckDetArr[2]+'   '+truckDetArr[3]+' '+truckDetArr)
       var data={
       "action":"enquire",
       "dealerID":truckDetArr[4],
       "name":$('#enName').val(),
       "emailID":$('#enEmail').val(),
       "phoneNo":$('#enTel').val(),
       "message":$('#enMsg').val(),
       "headline":truckDetArr[3],
       "refnumber":truckDetArr[2],
       "truckID":truckDetArr[1]
       }

        
    }else{
        var dealerId=localStorage.getItem('DealerEnq');
        // alert(truckDetArr[0]+'  '+truckDetArr[1]+'   '+truckDetArr[2]+'   '+truckDetArr[3]+' '+truckDetArr)
        var data={
            "action":"enquire",
            "dealerID":dealerId,
            "name":$('#enName').val(),
            "emailID":$('#enEmail').val(),
            "phoneNo":$('#enTel').val(),
            "message":$('#enMsg').val(),
            "headline":"",
            "refnumber":"",
            "truckID":"0"
        }
      
    }
    if(isLoggedIn()){
        data.userID=localStorage.getItem('userId');
    }else{
        data.userID="0";
    }
  //alert(JSON.stringify(data))
     console.log("jllghjjh   "+JSON.stringify(data))
    service.ajaxCall(JSON.stringify(data), function(res){
                     
                  //alert(JSON.stringify(res));
                     if(res.responseCode==200){
                            navigator.notification.alert('Enquiry Sent Successfully',notifySuccess,'TDA','OK');
                            $('#enName').val('');
                            $('#enEmail').val('');
                            $('#enTel').val('');
                            $('#enMsg').val('');
                     }else{
                        navigator.notification.alert('Enquiry cannot be sent.',notifySuccess,'TDA','OK');
                     
                     }
                },
                function(err){
                   console.log(JSON.stringify(err));
                      navigator.notification.alert('Enquiry cannot be sent.',notifySuccess,'TDA','OK');
                     
            })
    
}


function openMap(th){
    var addStr=$(th).text();
  //  alert(addStr);
    var url='https://www.google.com/maps/place/'+addStr.toString();
   // alert(url);
    window.open(url, '_blank','location=yes,closecaptionbutton=yes')

}
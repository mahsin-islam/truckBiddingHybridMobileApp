/*
 vishal'code
 */
$(document).on('focus', 'input', function() {
               setTimeout(function() {
                          window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                          //$('div[data-role="footer"]').hide();
                          },0);
               //$.mobile.silentScroll($('div[data-role="header"]').offset().top);
               });


$(document).on('blur', 'input, textarea', function() {
               setTimeout(function() {
                          window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                          //$('div[data-role="footer"]').show();
                          },0);
               });

/*
 vishal'code
 */



var dashBoardData=function(){
    if(loginstatus==1){
        var jsoN={
            "action": "myListing",
            "userID": user.Id,
            "deviceID": device.Id,
            "deviceType":device.Type
        }
        console.log("JSON  "+JSON.stringify(jsoN));
        service.ajaxCall(JSON.stringify(jsoN), displayDashboard2, function(err){
                         //    alert(JSON.stringify(err));
                         })
        
    }

}

var myListingData=function(){
    
    var jsoN={
        "action": "myListing",
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType":device.Type
    }
    console.log("JSON  "+JSON.stringify(jsoN));
    service.ajaxCall(JSON.stringify(jsoN), displayMyList, function(err){
                     //    alert(JSON.stringify(err));
                     })
    
}

$(document).on("pageshow", "#pageDashboard", dashBoardData)
$(document).on("pageshow", "#pageMyListing", myListingData)


function displayDashboard(res){
    
  //  alert('dashBoard : '+JSON.stringify(res));
    $('#dashBoardData').empty();
   // alert(res.hits.hits.length);
    var data=res.hits.hits;
    for(var i=0;i<data.length;i++){
        try{
            var pubDat;
            if(data[i]._source.hasOwnProperty('published_at')){
                var pubDat= new Date(data[i]._source.published_at.split(' ')[0]);
            }else if(data[i]._source.hasOwnProperty('created_at')){
                var pubDat= new Date(data[i]._source.created_at.split(' ')[0]);
            }
       var pubDat= new Date(data[i]._source.published_at.split(' ')[0]);
        var curDate= new Date();
       // alert(pubDat+'    /n      '+curDate);
        var timeDiff = Math.abs(curDate.getTime() - pubDat.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }catch(e){
           // alert(e);
        }
        
        var imgurl;
        try{
            
            if(data[i]._source.hasOwnProperty('filename1')){
               // imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i]._id+'/'+data[i]._source.filename1';
                imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i]._id+'/'+data[i]._source.filename1;
                console.log(imgurl);
            }else{
                imgurl='';
            }
        }catch(e){
            alert(i+"    "+JSON.stringify(e));
            imgurl='';
        }

      //  alert(diffDays);
        var dHtml='<li>'+
        '<div class="behind buttons-three"><a href="#" class="ui-btn delete-btns"><div class="images-hidden"><img src="themes/images/deleteicon.png"></div>'+
        '<div class="discrip-hidden">Delete</div></a><a href="#" class="ui-btn unpublish-btns"><div class="images-hidden"><img src="themes/images/unpublishicon.png"></div>'+
        '<div class="discrip-hidden">Un-publish</div></a><a href="#" class="ui-btn edit-btns"><div class="images-hidden"><img src="themes/images/editicon.png"></div>'+
        '<div class="discrip-hidden">Edit</div></a></div>'+
        '<a class="trackdetail"><div class="left-sec" onclick="getTruckDetails_AU('+data[i]._id+')"><div class="image" style="width:20%;height:auto;"><img src="'+imgurl+'" height="40px" width="40px"/></div>'+
        '<div class="discrip"><h3 class="dis-truck">'+(data[i]._source.headline.length < 22 ? data[i]._source.headline : data[i]._source.headline.substr(0, 22) + '<br>'+data[i]._source.headline.substr(22, data[i]._source.headline.length))+'</h3><div class="small-discrip">'+data[i]._source.cat_1_name+'/'+data[i]._source.cat_2_name+'</div><div class="truckrate">$'+data[i]._source.price+'</div>'+
        '</div></div><div class="right-sec publish"><div class="top"><div class="topsimages"><img src="themes/images/publish-date.png"></div><div class="tops">Published</div>'+
        '</div><div class="bottom">'+diffDays+' days remaining</div></div></a></li>';
        // console.log($('#dashBoardData').html());
        $('#dashBoardData').append(dHtml);
       //return;
    }
    $('#dashBoardData').listview('refresh');
    swipeRef();
    $('#dashBoardData').trigger('create');
    
}


function displayMyList(res){
    
    console.log('displayMyList   '+JSON.stringify(res));
    window.localStorage.setItem('myAdd',res.address);
   // alert('MyList : '+JSON.stringify(res));
    $('#myListingData').empty();
    // alert(res.hits.hits.length);
    var data=res.userInfo;
    for(var i=0;i<data.length;i++){
        try{
            var pubDat;
            if(data[i].hasOwnProperty('published_at')){
                var pubDat= new Date(data[i].published_at.split(' ')[0]);
            }else if(data[i].hasOwnProperty('created_at')){
                var pubDat= new Date(data[i].created_at.split(' ')[0]);
            }
           // var pubDat= new Date(data[i].published_at.split(' ')[0]);
            var curDate= new Date();
            // alert(pubDat+'    /n      '+curDate);
            var timeDiff = Math.abs(curDate.getTime() - pubDat.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }catch(e){
            // alert(e);
        }
        //  alert(diffDays);
        var imgurl;
        try{
           // imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i].id+'/'+data[i].image.image[0];
            if(data[i].image.hasOwnProperty('image')&&data[i].image.image.length>0){
                imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i].id+'/'+data[i].image.image[0];
                console.log('new url   '+imgurl);
            }else{
                imgurl='';
            }
        }catch(e){
            alert(i+"    "+JSON.stringify(e));
            imgurl='';
        }
        var dHtml='<li>'+
        '<div class="behind buttons-three"><a href="#" class="ui-btn delete-btns" id="del_'+data[i].id+'" onclick="deleteListing(this)"><div class="images-hidden"><img src="themes/images/deleteicon.png"></div>'+
        '<div class="discrip-hidden">Delete</div></a>';
        if(data[i].publishStatus=='Published'){
           dHtml+= '<a href="#" class="ui-btn unpublish-btns" status="un" id="un_'+data[i].id+'" onclick="publishAndUnpub(this)"><div class="images-hidden"><img src="themes/images/unpublishicon.png"></div><div class="discrip-hidden">Unpublish</div></a>';
        }else{
           dHtml+= '<a href="#" class="ui-btn unpublish-btns" status="pu" id="pu_'+data[i].id+'" onclick="publishAndUnpub(this)"><div class="images-hidden"><img src="themes/images/unpublishicon.png"></div><div class="discrip-hidden">Publish</div></a>';
        }
       dHtml+= '<a href="#" class="ui-btn edit-btns" id="edit_'+data[i].id+'" onclick="editCurrentList(this)"><div class="images-hidden"><img src="themes/images/editicon.png"></div>'+
        '<div class="discrip-hidden">Edit</div></a></div>'+
        '<a class="trackdetail"><div class="left-sec" onclick="getTruckDetails_AU('+data[i].id+')"><div class="image" style="width:20%;height:auto;"><img  src="'+imgurl+'" height="40px" width="40px"></div>'+
        '<div class="discrip"><h3 class="dis-truck">'+(data[i].headline.length < 22 ? data[i].headline : data[i].headline.substr(0, 22) + '<br>'+data[i].headline.substr(22, data[i].headline.length))+'</h3><div class="small-discrip">'+data[i].cat_1_name+'/'+data[i].cat_2_name+'</div><div class="truckrate">$ '+data[i].price+'</div></div></div>';
        if(data[i].publishStatus=='Published'){
             dHtml+='<div class="right-sec publish"><div class="top"><div class="topsimages"><img src="themes/images/publish-date.png"></div><div class="tops">'+data[i].publishStatus+'</div>';
        }else{
             dHtml+= '<div class="right-sec un-published"><div class="top"><div class="topsimages"><img src="themes/images/publish-date.png"></div><div class="tops">'+data[i].publishStatus+'</div>';
        }
         dHtml+='</div><div class="bottom">'+diffDays+' days remaining</div></div></a></li>';
        console.log($('#myListingData').html());
        $('#myListingData').append(dHtml);
        //return;
    }
    $('#myListingData').listview('refresh');
               swipeRef();
               $('#myListingData').trigger('create');

}



function displayDashboard2(res){
    
     console.log('displaydashboard   '+JSON.stringify(res));
    window.localStorage.setItem('myAdd',res.address)
    $('#dashBoardData').empty();
    var data=res.userInfo;
    for(var i=0;i<data.length;i++){
        try{
            var pubDat;
            if(data[i].hasOwnProperty('published_at')){
                var pubDat= new Date(data[i].published_at.split(' ')[0]);
            }else if(data[i].hasOwnProperty('created_at')){
                var pubDat= new Date(data[i].created_at.split(' ')[0]);
            }
            // var pubDat= new Date(data[i].published_at.split(' ')[0]);
            var curDate= new Date();
            // alert(pubDat+'    /n      '+curDate);
            var timeDiff = Math.abs(curDate.getTime() - pubDat.getTime());
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        }catch(e){
            // alert(e);
        }
        //  alert(diffDays);
        var imgurl;
        try{
            // imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i].id+'/'+data[i].image.image[0];
            if(data[i].image.hasOwnProperty('image')&&data[i].image.image.length>0){
                imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+data[i].id+'/'+data[i].image.image[0];
                console.log(imgurl);
            }else{
                imgurl='';
            }
        }catch(e){
            alert(i+"    "+JSON.stringify(e));
            imgurl='';
        }
        var dHtml='<li>'+
        '<div class="behind buttons-three"><a href="#" class="ui-btn delete-btns" id="delD_'+data[i].id+'" onclick="deleteListing(this)"><div class="images-hidden"><img src="themes/images/deleteicon.png"></div>'+
        '<div class="discrip-hidden">Delete</div></a>';
        if(data[i].publishStatus=='Published'){
            dHtml+= '<a href="#" class="ui-btn unpublish-btns" status="un" id="unD_'+data[i].id+'" onclick="publishAndUnpub(this)"><div class="images-hidden"><img src="themes/images/unpublishicon.png"></div><div class="discrip-hidden">Unpublish</div></a>';
        }else{
            dHtml+= '<a href="#" class="ui-btn unpublish-btns" status="pu" id="puD_'+data[i].id+'" onclick="publishAndUnpub(this)"><div class="images-hidden"><img src="themes/images/unpublishicon.png"></div><div class="discrip-hidden">Publish</div></a>';
        }
        dHtml+= '<a href="#" class="ui-btn edit-btns" id="editD_'+data[i].id+'" onclick="editCurrentList(this)"><div class="images-hidden"><img src="themes/images/editicon.png"></div>'+
        '<div class="discrip-hidden">Edit</div></a></div>'+
        '<a class="trackdetail"><div class="left-sec" onclick="getTruckDetails_AU('+data[i].id+')"><div class="image" style="width:20%;height:auto;"><img  src="'+imgurl+'" height="40px" width="40px"></div>'+
        '<div class="discrip"><h3 class="dis-truck">'+(data[i].headline.length < 22 ? data[i].headline : data[i].headline.substr(0, 22) + '<br>'+data[i].headline.substr(22, data[i].headline.length))+'</h3><div class="small-discrip">'+data[i].cat_1_name+'/'+data[i].cat_2_name+'</div><div class="truckrate">$ '+data[i].price+'</div></div></div>';
        if(data[i].publishStatus=='Published'){
            dHtml+='<div class="right-sec publish"><div class="top"><div class="topsimages"><img src="themes/images/publish-date.png"></div><div class="tops">'+data[i].publishStatus+'</div>';
        }else{
            dHtml+= '<div class="right-sec un-published"><div class="top"><div class="topsimages"><img src="themes/images/publish-date.png"></div><div class="tops">'+data[i].publishStatus+'</div>';
        }
        dHtml+='</div><div class="bottom">'+diffDays+' days remaining</div></div></a></li>';
        console.log($('#dashBoardData').html());
        $('#dashBoardData').append(dHtml);
        //return;
    }
    $('#dashBoardData').listview('refresh');
    swipeRef();
    $('#dashBoardData').trigger('create');
    
}






function deleteListing(id){
  //  alert($(id).attr('id'))
    var jSon ={
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType":device.Type,
        "listID": $(id).attr('id').split('_')[1]
    }
    
   // alert(JSON.stringify(jSon))
    console.log(JSON.stringify(jSon))
   // alert($(id).parent().parent().html());
   // return;
    $.ajax({
           type: "POST",
           url:'https://truckdealersaustralia.com.au/mobile/webservices/deleteTruck.php',
           data:JSON.stringify(jSon),
           contentType: "application/json",
           dataType: "json",
           beforeSend:function(){
           },
           complete:function(){
           },
           success: function(res){
                  //  alert(JSON.stringify(res));
                    console.log('del success'+JSON.stringify(jSon))
                    $(id).parent().parent().remove();
           
           },
           error: function(err){
                  //  alert(JSON.stringify(err));
                    console.log('del err'+JSON.stringify(err))
                    navigator.notification.alert('Could not delete this listing. Please try again later.', notifySuccess,'TDA','OK');           }
     });

    
//    service.ajaxCall(JSON.stringify(jSon), function(res){
//                     alert(JSON.stringify(res));
//                     $(id).parent().parent().remove();
//                     
//                     }, function(err){
//                      alert(JSON.stringify(err));
//                     navigator.notification.alert('Could not delete this listing. Please try again later.', notifySuccess,'TDA','OK');
//                })
    
}



function publishAndUnpub(id){
   // alert($(id).attr('id'));
    var todo;
    if($(id).attr('status')=='pu'){
        todo='Publish'
    }else{
        todo='Unpublish'
    }
    
   var jSon = {
                "action":"publishListing",
                 "userID": user.Id,
                "deviceID": device.Id,
                "deviceType":device.Type,
                "listID": $(id).attr('id').split('_')[1],
                "publishStatus": todo
    }
    console.log(JSON.stringify(jSon))
    service.ajaxCall(JSON.stringify(jSon), function(res){
                               // alert(JSON.stringify(res));
                            if(res.responseCode==200 && res.paymentStatus == 1){
                                    navigator.notification.alert(todo+'ed.', notifySuccess,'TDA','OK');
                                if(todo=='Publish'){
                                        $(id).parent().parent().find('.un-published').addClass('publish').removeClass('un-published');
                                    // $('.un-published').addClass('publish').removeClass('un-published');
                                        $(id).parent().parent().find('.tops').text('Published')
                                        $(id).find('.discrip-hidden').text('Unpublish');
                                        $(id).attr('status','un')
                                }else{
                                        $(id).parent().parent().find('.publish').addClass('un-published').removeClass('publish');
                                        $(id).parent().parent().find('.tops').text('Unpublished')
                                        $(id).find('.discrip-hidden').text('Publish');
                                        $(id).attr('status','pu')

                                }
                            }
                            else if(res.paymentStatus !=0 && res.responseCode==200)
                            {
                                    navigator.notification.confirm('Cannot be published.Payment not made for this product.Do you want to make payment', // message
                                                                        function(buttonIndex) {
                                                                            if(buttonIndex==1){
                                                                            localStorage.setItem('listId',$(id).attr('id').split('_')[1])
                                                    
                                                                            $.mobile.changePage("#pagePayment", {transition:"none"})
                                                                        }else{
                                                                            return;
                                                                        }
                                                                    },            // callback to invoke with index of button pressed
                                                                    'TDA',           // title
                                                                    ['Pay','Pay Later']     // buttonLabels
                                                                   );

                            }
                            else if(res.responseCode==0 ){
                            navigator.notification.confirm('Cannot be published.Payment not made for this product.Do you want to make payment', // message
                                                            function(buttonIndex) {
                                                                if(buttonIndex==1){
                                                                        localStorage.setItem('listId',$(id).attr('id').split('_')[1])
                                                           
                                                                    $.mobile.changePage("#pagePayment", {transition:"none"})
                                                                }else{
                                                                    return;
                                                                }
                                                            },            // callback to invoke with index of button pressed
                                                            'TDA',           // title
                                                            ['Pay','Pay Later']     // buttonLabels
                                                          );
                               // navigator.notification.alert('Cannot  published this product . Payment is not done for this product. ', notifySuccess,'TDA','OK');
    
                            } else if(res.responseCode==1){
                                navigator.notification.alert('Product is expired.', notifySuccess,'TDA','OK');
                     
                        }
                    }, function(err){
                   //  alert(JSON.stringify(err));
                     alert('ERROR    '+JSON.stringify(err));
                     navigator.notification.alert('Could not '+todo+' this listing. Please try again later.', notifySuccess,'TDA','OK');
            })
}


function validateCard(){
   // alert($('#stripeCard').val());
    if($('#stripeCard').val().length==16){
        //alert('yes');
      var card=Stripe.card.validateCardNumber($('#stripeCard').val())
        //alert(card)
    }
    
}

//editCurrentList()


function stripePayment(){
    var truckId=localStorage.getItem('listId');
    var truckHeadline=truckInfo.heading;
    var nameOnCard=$('#stripeCardName').val();
    var card=$('#stripeCard').val();
    var mmyy=$('#stripeValidity').val();
    var cvv=$('#stripeCVV').val();
    if(card==''){
        navigator.notification.alert('Enter valid card number.', notifySuccess,'TDA','OK');
        $('#stripeCVV').val('');
        return;
    }
    else if(!Stripe.card.validateCardNumber(card)){
        navigator.notification.alert('Card number is not valid.', notifySuccess,'TDA','OK');
        $('#stripeCVV').val('');
        return;
    }else if(mmyy.indexOf('/')<0||mmyy.length<7){
        navigator.notification.alert('Please enter expiry date in MM/YYYY format.', notifySuccess,'TDA','OK');
        $('#stripeCVV').val('');
        return;
            
    }else if(!Stripe.card.validateExpiry(mmyy.split('/')[0], mmyy.split('/')[1])){
        navigator.notification.alert('Please enter valid expiry date in MM/YYYY format.', notifySuccess,'TDA','OK');
        $('#stripeCVV').val('');
       return;
    }else if(!Stripe.card.validateCVC(cvv)){
        navigator.notification.alert('CVV number is not valid.', notifySuccess,'TDA','OK');
        $('#stripeCVV').val('');
        return;
    }

    var year=mmyy.split('/')[1].substring(2,4)
    var payMentJson={
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType": device.Type,
        "listID": truckId,
        "productname": truckHeadline,
        "amount": "5500",
        "number": card,
        "exp_month": mmyy.split('/')[0],
        "exp_year":year ,
        "cvc":cvv
    }

    //alert(JSON.stringify(payMentJson));
    console.log(JSON.stringify(payMentJson));

    $.ajax({
           type: "POST",
          // url:'http://172.16.0.9/PROJECTS/TruckSales/trunk/webservices/stripe_payment/payment.php',
           url:'https://truckdealersaustralia.com.au/mobile/webservices/stripe_payment/payment.php',
           data:JSON.stringify(payMentJson),
           contentType: "application/json",
           dataType: "json",
           beforeSend:function(){
                spinnerplugin.show();
           },
           complete:function(){
           },
           success: function(result){
                     spinnerplugin.hide();
                   // alert(JSON.stringify(result));
                    console.log(JSON.stringify(result));
                if(result.responseCode==200){
                        $('#stripeCVV').val('');
                        $('#stripeCard').val('');
                        $('#stripeCardName').val('');
                        $('#stripeValidity').val('');
                        navigator.notification.alert('Payment done successfully.', notifySuccess,'TDA','OK');
                        $.mobile.changePage("#pageMyListing", {transition:"none"})
           
                }else{
                        navigator.notification.alert('Payment failed.', notifySuccess,'TDA','OK');
           
                }
            },
           error: function(err){
                spinnerplugin.hide();
              // alert(JSON.stringify(err));
                 navigator.notification.alert('Payment failed.Server Error', notifySuccess,'TDA','OK');
                console.log(JSON.stringify(err));
 
           }
        });

}



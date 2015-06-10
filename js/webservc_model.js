/////////////////////////////////////////////////////////// Global Ajax function /////////////////////////////////////////////////////

//var backendUrl= "http://172.16.0.9/PROJECTS/TruckSales/trunk/webservices/web_services.php";
//var backendUrl= "http://203.92.32.29/PROJECTS/TruckSales/trunk/webservices/web_services.php";
var backendUrl= "https://truckdealersaustralia.com.au/mobile/webservices/web_services.php";
//var backendUrl= "http://dando.dev.techarete.com/webservices/web_services.php";


var service = {
    
    // Check internet connection
checkConnection: function(){
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(states[networkState]=='none'){
        return false;
    }else{
        return true
    }
    
},
    
    // call backend api's
ajaxCall:function(params,callback,errorCallback){
    //alert('params');
    var options={};
    options.type="POST";
    options.contentType='application/json';
    options.url=backendUrl;
    options.data=params;
    options.dataType = 'json';
    options.cache = false;
    options.beforeSend=function() {
        try{
            spinnerplugin.show();
        }catch(e){
        }
    };
    options.success = function( resData ){
        try{
            spinnerplugin.hide();
        }catch(e){
        }
        console.log('Success ajaxCall=='+ JSON.stringify(resData));
        callback(resData);
    };
    options.error=function(errorMsg) {
       // alert('ajaxCall  Error =='+ JSON.stringify(errorMsg));
        try{
            spinnerplugin.hide();
        }catch(e){
        }
        console.log('ajaxCall  Error =='+ JSON.stringify(errorMsg));
        errorCallback(errorMsg);
    }
    if(service.checkConnection){
        $.ajax(options);
    }else{
        navigator.notification.alert('Please check your internet connection',function(){notifySuccess()} ,'TDA','OK');
    }
    
},
    //
  
ajaxget:function(URl,callback,errorCallback){
    var options={};
    console.log('URL --'+URl);
    options.type="GET";
    options.url=URl;
    options.contentType='application/json';
    options.dataType = 'json';
    options.beforeSend=function() {
        spinnerplugin.show();
        try{
            spinnerplugin.show();
        }catch(e){
        }
    };
    options.success = function( resData ){
        try{
            spinnerplugin.hide();
        }catch(e){
        }

        console.log('ajaxGET  Success = '+ JSON.stringify(resData));
       // alert('ajaxGET  Success = '+ JSON.stringify(resData));
        callback(resData);
    };
    options.error=function(errorMsg) {
       // alert('ajaxGET  Error  = '+ JSON.stringify(errorMsg));
        console.log('ajaxGET  Error  = '+ JSON.stringify(errorMsg));
        try{
                spinnerplugin.hide();
        }catch(e){
            alert('ajax get ex : '+e);
        }
        
        
        errorCallback(errorMsg);
        
    }
    if(service.checkConnection){
        $.ajax(options);
    }else{
        spinnerplugin.hide();
        navigator.notification.alert('Please check your internet connection', function(){notifySuccess()},'Truck Sales','OK');
    }
    
}
    
}

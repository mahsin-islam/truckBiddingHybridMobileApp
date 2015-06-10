                    //THIS FILE CONTAINS FUNCTIONALITIES OF SORTING ON THE TRUCK LISTING SCREEN
                    //Author : Ameeduddin

//------------------------------------------------
    //FUNCTION FOR NAVIGATION SORTING PAGE
//------------------------------------------------
function navSorting()
{
    console.log('EXPORT \n \n \n'+JSON.stringify(trukListData_AU));
    $.mobile.changePage("#pageSorting", {transition:"none"})
    menuClk=0;
}


//----------------------------------------------------------
    //  SORTING FUNCTIONS BY KEY VALUE PAIR -----------
//----------------------------------------------------------

var sort_by = function(field, reverse, primer){
    
    var key = primer ?
    function(x) {return primer(x[field])} :
    function(x) {return x[field]};
    
    reverse = [-1, 1][+!!reverse];
    
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    } 
}


//----------------------------------------------------------
//  SORTING FUNCTIONS BY KEY VALUE PAIR STRINGS-----------
//----------------------------------------------------------

function sortOn(arr, prop, reverse, numeric)
{
    
    // Ensure there's a property
    if (!prop || !arr) {
        return arr
    }
    
    // Set up sort function
    var sort_by = function (field, rev, primer) {
        
        // Return the required a,b function
        return function (a, b) {
            
            // Reset a, b to the field
            a = primer(a[field]), b = primer(b[field]);
            
            // Do actual sorting, reverse as needed
            return ((a < b) ? -1 : ((a > b) ? 1 : 0)) * (rev ? -1 : 1);
        }
        
    }
    if (numeric) {
        // Do sort "in place" with sort_by function
        arr.sort(sort_by(prop, reverse, function (a) {
                         
                        
                         return parseFloat(String(a).replace(/[^0-9.-]+/g, ''));
                         
                         }));
    } else {
        
        // Do sort "in place" with sort_by function
        arr.sort(sort_by(prop, reverse, function (a) {
                         
                         // - Force value to string.
                         return String(a).toUpperCase();
                         
                         }));
    }
    
    
}
//----------------------------------------------------------
//  SORTING FUNCTIONS BY PRICE -----------
//----------------------------------------------------------

function sortTrucklist_price(order_str)
{
    var t=trukListData_AU.hits.hits;
    for(var i=0;i<trukListData_AU.hits.hits.length;i++)
    {
        try
        {
            t[i].price=parseInt(t[i]._source.price);
        }
        catch(ex)
        {
            
          
           // alert('sortTrucklist_price  '+ex)
        }
        
    }
    t=t.sort(sort_by('price', true, parseInt));
    console.log('MY JSON  '+JSON.stringify(t));
   
    if(order_str == 'a')
    {
        displayListSorted_AU(t);
    }
    if(order_str == 'd')
    {
        displayListRevSorted_AU(t);
    }
    
}

//----------------------------------------------------------
//  SORTING FUNCTIONS BY YEAR -----------
//----------------------------------------------------------

function sortTrucklist_year(order_str)
{
    var t=trukListData_AU.hits.hits;
    for(var i=0;i<trukListData_AU.hits.hits.length;i++)
    {
        try
        {
            t[i].year=parseInt(t[i]._source.year);
        }
        catch(ex)
        {
            alert('sortTrucklist_price  '+ex)
        }
        
        
    }
    t=t.sort(sort_by('year', true, parseInt));
    console.log('MY JSON  '+JSON.stringify(t));
    try
    {
        if(order_str == 'a')
        {
            displayListSorted_AU(t);
        }
        if(order_str == 'd')
        {
            displayListRevSorted_AU(t);
        }
    }catch(ex)
    {
        alert('ex   '+ex)
    }
    
}

//----------------------------------------------------------
//  SORTING FUNCTIONS BY CATAGORY -----------
//----------------------------------------------------------

function sortTrucklist_catgry(order_str)
{
    var t=trukListData_AU.hits.hits;
    for(var i=0;i<trukListData_AU.hits.hits.length;i++)
    {
        try
        {
            t[i].catagory=t[i]._source.cat_1_name;
        }
        catch(ex)
        {
            //alert('kk')
            alert('sortTrucklist_price  '+ex)
        }
    }
    
    sortOn(t, 'catagory', false, false);
    console.log('MY JSON -- '+JSON.stringify(t));

    if(order_str == 'a')
    {
        displayListSorted_AU(t);
    }
    if(order_str == 'd')
    {
        displayListRevSorted_AU(t);
    }
    
}

//----------------------------------------------------------
//  SORTING FUNCTIONS BY MAKE/MODEl -----------
//----------------------------------------------------------

function sortTrucklist_make(order_str)
{
    try{
    var t=trukListData_AU.hits.hits;
    for(var i=0;i<trukListData_AU.hits.hits.length;i++)
    {
        try
        {
            t[i].make=t[i]._source.make;
        }
        catch(ex)
        {
            alert('sortTrucklist_price  '+ex)
        }
        
    }
    sortOn(t, 'make', false, false);
    console.log('make JSON -- '+JSON.stringify(t));
    
    if(order_str == 'a')
    {
        displayListSorted_AU(t);
    }
    if(order_str == 'd')
    {
        displayListRevSorted_AU(t);
    }
    }
    catch(ex)
    {
        alert('make error '+ex);
    }
    
}


//----------------------------------------------------------
//  SORTING FUNCTIONS BY LAST UPDATED -----------
//----------------------------------------------------------

function sortTrucklist_updated()
{
    var t=trukListData_AU.hits.hits;
    for(var i=0;i<trukListData_AU.hits.hits.length;i++)
    {
        t[i].price=parseInt(t[i]._source.price);
        
    }
    t=t.sort(sort_by('price', true, parseInt));
    console.log('MY JSON  '+JSON.stringify(t));
    displayListSorted_AU(t)
    
}



/* --------------------------------------------------------------------------------
   Function to put the LIST of TRUCK DETAILS IN SORTED ORDER (LOW TO HIGH)
----------------------------------------------------------------------------------*/
function displayListSorted_AU(in_t)
{
//    alert('--T  - '+in_t);
    
    $('#topcontainerTruckdetails').empty();
     $('#container_ressearcgPage').empty();
    try
    {
        for(var i=0;i<in_t.length;i++)
        {
            var type_local=in_t[i]._source.type;
            type_local = type_local.replace(/_/g, ' ');
            type_local = capitalize(type_local);
            var truckId_Selctd = in_t[i]._id;
            var dealer_state=in_t[i]._source.dealer_state;
            dealer_state =  changeStateName(dealer_state);
            if(in_t[i]._source.hasOwnProperty('filename1'))
            {
                var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+truckId_Selctd+'/'+in_t[i]._source.filename1;
            }
            else
            {
                imgurl="themes/images/01.png";
            }
            
//            var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+truckId_Selctd+'/'+in_t[i]._source.filename1;
            var dealerlogo_imgurl=' https://truckdealersaustralia.com.au/uploads/dealers/'+in_t[i]._source.dealer_id+'/logo/'+in_t[i]._source.dealer_logo;
//            var imgurl='https://truckdealersaustralia.com.au/image/listings/cEo/'+in_t[i]._source.filename1;
//            var dealerlogo_imgurl='https://truckdealersaustralia.com.au/image/logo/bbh/'+in_t[i]._source.dealer_logo;
//            
//            
//            $('#topcontainerTruckdetails').append('<div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="themes/images/01.png"></div><div class="sliderlogo"><img width: auto; max-height: 44px !important; src="'+dealerlogo_imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+in_t[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+in_t[i]._source.type+'</li><li class="dealeryear">'+in_t[i]._source.year+'</li><li class="dealerland"><span>'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">$'+in_t[i]._source.price+'</li><li class="dealerstar"><img src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div>');
//            
//            $('#topcontainerTruckdetails').append('<div class="clearheight"></div>')
            var yrlocal = in_t[i]._source.year;
            var fav_unfavimgid= 'favStr_fnctlty'+truckId_Selctd;
            if(yrlocal == 0 || yrlocal == 'null' || yrlocal == '')
            {
                yrlocal = ' - '
            }
            var pricelocal = in_t[i]._source.price;
            pricelocal=addCommas(pricelocal);
            if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
            {
                pricelocal='      -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            
            if(in_t[i]._source.dealer_logo == "" || in_t[i]._source.dealer_logo == null)
            {
                $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+in_t[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
                $('#container_ressearcgPage').append('<div class="clearheight"></div>')
                
            }
            else
            {
                $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div><div class="sliderlogo"><img width: auto; max-height: 44px !important; src="'+dealerlogo_imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+in_t[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
                $('#container_ressearcgPage').append('<div class="clearheight"></div>')
            }


            
        }
    }
    catch(ex)
    {
        alert(' exxx  '+ex)
    }
    $('#container_ressearcgPage').trigger('create');
//    $('#topcontainerTruckdetails').trigger('create');
    //    $('#pageSearchResult').trigger('create');
    $.mobile.changePage("#pageSearchResult", {transition:"none"})
    menuClk=0;

}

/* --------------------------------------------------------------------------------
 Function to put the LIST of TRUCK DETAILS IN SORTED ORDER (HIGH TO LOW)
 ----------------------------------------------------------------------------------*/
function displayListRevSorted_AU(in_t)
{
// alert('--T  - '+in_t);
    
    $('#topcontainerTruckdetails').empty();
    $('#container_ressearcgPage').empty();
    
    try
    {
        for(var i=in_t.length-1;i>=0;i--)
        {
            var truckId_Selctd = in_t[i]._id;
            var dealer_state=in_t[i]._source.dealer_state;
            dealer_state =  changeStateName(dealer_state);
            
            if(in_t[i]._source.hasOwnProperty('filename1'))
            {
                var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+truckId_Selctd+'/'+in_t[i]._source.filename1;
            }
            else
            {
                imgurl="themes/images/01.png";
            }

            var dealerlogo_imgurl=' https://truckdealersaustralia.com.au/uploads/dealers/'+in_t[i]._source.dealer_id+'/logo/'+in_t[i]._source.dealer_logo;

            
            try{
                
                var yrlocal = in_t[i]._source.year;
                if(yrlocal == 0 || yrlocal == 'null' || yrlocal == '')
                {
                    yrlocal = ' - '
                }
                var pricelocal = in_t[i]._source.price;
                pricelocal=addCommas(pricelocal);
                if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
                {
                    pricelocal='      -'
                }
                else
                {
                    pricelocal=' $'+pricelocal;
                }

                
                var type_local=in_t[i]._source.type;
                type_local = type_local.replace(/_/g, ' ');
                type_local = capitalize(type_local);
                 var fav_unfavimgid= 'favStr_fnctlty'+truckId_Selctd;
                if(in_t[i]._source.dealer_logo == "" || in_t[i]._source.dealer_logo == null)
                {
                    $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+in_t[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
                    $('#container_ressearcgPage').append('<div class="clearheight"></div>')
                    
                }
                else
                {
                    $('#container_ressearcgPage').append('<div class="sliderbg" id="topcontainerTruckdetails"><div class="slider-main" id="truckdetailsandPic_Au"><div class="slider-top"><div class="sliderimages"><img src="'+imgurl+'"></div><div class="sliderlogo"><img width: auto; max-height: 44px !important; src="'+dealerlogo_imgurl+'"></div></div><div class="slidercontner" id="Truckdetails_Container_AU"><div class="top" id="headrTruckDetails_AU"><h3>'+in_t[i]._source.headline+'</h3>Trucks/Prime Mover</div><div class="mid" id="middleTruckDetails_AU"><ul id="middleListTruck_AU"><li class="dealername">'+type_local+'</li><li class="dealeryear">'+yrlocal+'</li><li class="dealerland"><span class="contryimg"></span><span class="contytext">'+dealer_state+'</span></li></ul></div><div class="botom" id="bottomTruckDetails_AU"><ul id="lowerListTruck_AU"><li class="dealerrate">'+pricelocal+'</li><li class="dealerstar" onclick="addTofav_AU(\''+truckId_Selctd+'\')"><img id="'+fav_unfavimgid+'" src="themes/images/starrating.png"></li><li class="viewdetail"><a href="#" onclick="getTruckDetails_AU(\''+truckId_Selctd+'\')">VIEW DETAILS</a></li></ul></div></div></div></div>');
                    $('#container_ressearcgPage').append('<div class="clearheight"></div>')
                }
                
            }
            catch(ex)
            {
                alert("yjkydjklb  "+JSON.stringify(ex));
            }
        }
        
    }
    catch(ex)
    {
        alert(' exxx  '+ex)
    }
    $('#container_ressearcgPage').trigger('create');
//    $('#topcontainerTruckdetails').trigger('create');
    //    $('#pageSearchResult').trigger('create');
    $.mobile.changePage("#pageSearchResult", {transition:"none"})
    menuClk=0;
    
}

    





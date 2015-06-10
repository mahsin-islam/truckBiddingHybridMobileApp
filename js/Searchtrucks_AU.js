                    //THIS FILE CONTAINS FUNCTIONALITIES  ON THE SEARCH SCREEN FOR THE TRUCKS
                    //Author : Ameeduddin


 var catOne={}

/*****************************************************************************************
 Function to LOAD SUB CATAGORIES #3 on Selection of a SUB CATAGORIES on "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
function loadCatagories3_AU(textSelected,valSel)
{
   // alert(valSel);
    var getcatg2_Json={"action":"subCategory",
                       "parent":valSel
                      };
    getcatg2_Json=JSON.stringify(getcatg2_Json);
    console.log('SUB CATAGORY #getcatg2_Json -- '+getcatg2_Json);
        //Backend API invocation to retreive catagory 3
    service.ajaxCall(getcatg2_Json,function(result_data){
                     try{
                            if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                            {
                                $('#searchBoxCatagory3_Au').empty();
                                $('#searchBoxCatagory3_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
                                $('#searchBoxCatagory3_Au').append('<option value="-1">All sub-categories</option>');
                     
                                for(var i=0;i<result_data.category.length;i++)
                                {
                                    var tst_var=true;
                                    $.each(result_data.category[i],function(idx,val)
                                            {
                                                if(tst_var == true)
                                                {
                                                    $('#searchBoxCatagory3_Au').append('<option value="'+idx+'">'+val+'</option>');
                                                 //alert(idx+' --- '+val +'hfjhdsjg '+result_data.category[i].hasSubcategory+' ?? '+ idx);
                                                    tst_var = false;
                                                }
                                            });
                                }
                            }
                            else
                            {
                                $('#searchBoxCatagory3_Au').empty();
                                $('#searchBoxCatagory3_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
                                $('#searchBoxCatagory3_Au').append('<option selected="selected">All sub-categories</option>');
                            }
                     }
                     catch(ex)
                     {
                        alert(ex+JSON.stringify(ex));
                     }
                },
                function(result_data)
                {
                     navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                });

}


$(document).on('change','#searchBoxCatagory2_Au',function(){
              $('#catagory3Continer_AU').empty();
               var optionSelected = $(this).find("option:selected");
               var textSelected   = optionSelected.text();
               var valueSelected   = optionSelected.val();
               
               
          //  alert(' textSelected '+textSelected+ '  val  '+valueSelected)
               if(textSelected == 'Select  a sub-category' || textSelected == 'All sub-categories' || valueSelected.split('_')[1] == 0)
               {
                   $('#catagory3Continer_AU').empty()
               }
               else
               {
                 $('#catagory3Continer_AU').append('<select id="searchBoxCatagory3_Au"><option disabled selected style="display:none;">Select a sub-category</option></select>');
                 $('#searchBoxCatagory3_Au').append('<option >All sub-categories</option>');
                 $('#catagory3Continer_AU').trigger('create');
                    loadCatagories3_AU(textSelected,valueSelected.split('_')[0]);
               }
});



/*****************************************************************************************
 Function to LOAD SUB CATAGORIES on Selection of a CATAGORY on "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 ************************************************************************************************************/
function  loadCatagories2_AU(select_string,sel_val)
{
    var getcatg2_Json={"action":"subCategory",
                       "parent":sel_val
                      };
    getcatg2_Json=JSON.stringify(getcatg2_Json);
    console.log('getcatg2_Json -- '+getcatg2_Json);
    
    //Backend API invocation to retreive catagory 2
    service.ajaxCall(getcatg2_Json,function(result_data){
            try{
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                     {
                        $('#searchBoxCatagory2_Au').empty();
                        $('#searchBoxCatagory2_Au').trigger('create');
                        $('#searchBoxCatagory2_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
                        $('#searchBoxCatagory2_Au').append('<option value="-1">All sub-categories</option>');
                        for(var i=0;i<result_data.category.length;i++)
                        {
                            var tst_var=true;
                            $.each(result_data.category[i],function(idx,val)
                                   {
                                    if(tst_var == true){
                                    var val_Option =idx+'_'+result_data.category[i].hasSubcategory;
                                    $('#searchBoxCatagory2_Au').append('<option value="'+val_Option+'">'+val+'</option>');
                                    tst_var = false;
                                   }
                                   });
                        }
                     }
                     else
                     {
                        $('#searchBoxCatagory2_Au').empty();
                        $('#searchBoxCatagory2_Au').trigger('create');
                        $('#searchBoxCatagory2_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
                        $('#searchBoxCatagory2_Au').append('<option selected="selected">All sub-categories</option>');
                     }
                }
                catch(ex)
                {
                     alert(ex+JSON.stringify(ex));
                }
            },
            function(result_data)
            {
                     navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
            });
    
}


$(document).on('change','#searchBoxCatagory1_Au',function(){
     // alert('abc')
        
        $('#searchBoxCatagory2_Au').selectmenu();
        $('#searchBoxCatagory2_Au').selectmenu('refresh');
               
        var optionSelected = $(this).find("option:selected");
       
        var textSelected   = optionSelected.text();
        var valselected    = -1
            valselected   = optionSelected.val();
     //   alert(' textSelected '+textSelected+optionSelected.val());
      
       if(textSelected == 'Select a category' || textSelected == 'All categories')
       {
         $('#searchBoxCatagory2_Au').empty();
         $('#searchBoxCatagory2_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
         $('#searchBoxCatagory2_Au').append('<option>All sub-categories</option>');
         $('#searchBoxCatagory2_Au').trigger('create');

       }
       else
       {
         loadCatagories2_AU(textSelected,valselected);
       }
});




/*******************************************************
 Function to LOAD CATAGORIES on  "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *********************************************************/

$(document).on("pageshow","#pageSearchScreen",loadCatagories1_AU);




var refrsh_Dealer= false;

function loadCatagories1_AU()
{
    
    $('#searchBoxCatagory2_Au').selectmenu();
    $('#searchBoxModel_AU').selectmenu();
    
//    $("#searchBox_minprice_AU").selectmenu();
//    $("#searchBox_maxprice_AU").selectmenu();
    
    $('#checkbox_container_AU').empty();
    $('#searchBoxCatagory2_Au').empty();
    $('#catagory3Continer_AU').empty();
    $('#trucksearch_keywordAU').val('');
    
    $('#searchBoxCatagory2_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
    $('#searchBoxCatagory2_Au').append('<option value="-1">All sub-categories</option>');
    $('#searchBoxCatagory2_Au').trigger('create');
    $('#searchBoxCatagory2_Au').selectmenu('refresh');
   
    
    $('#searchBoxModel_AU').empty();
    $('#searchBoxModel_AU').append('<option disabled selected style="display:none;">Select a model</option>');
    $('#searchBoxModel_AU').trigger('create');
    $('#searchBoxModel_AU').selectmenu('refresh');
    
    
   
    
    
    
    $('#checkbox_container_AU').append('<input type="checkbox" checked="checked" value="dealer_new" name="chnk_dealr" id="dealer_new" ><label for="dealer_new"> New </label><input type="checkbox"  value="dealer_used" name="chnk_dealr" checked="checked" id="dealer_used" ><label for="dealer_used"> Used </label><input type="checkbox"  value="dealer_demo" name="chnk_dealr" id="dealer_demo"checked="checked" ><label for="dealer_demo"> Demo </label>');
    $('#checkbox_container_AU').trigger('create');
    
    $('#private_clicked').css('background','#E8E4E4');
    $('#private_clicked').trigger('create');

    $('#dealer_clicked').css('background','grey');
    $('#dealer_clicked').trigger('create');
    
    $('#search_btn_hmePge').attr('dealr_atri','');
    
    var getcatg1_Json={"action":"getCategory"};
    getcatg1_Json=JSON.stringify(getcatg1_Json);
    console.log('getcatg1_Json -- '+getcatg1_Json);
                    //Backend API invokation to retreive catagory 1
    
    service.ajaxCall(getcatg1_Json,function(result_data){
       try{
                      $('#searchBoxCatagory1_Au').selectmenu();
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                     {
                     var objX ={};
                       console.log('getCategory  jijij    '+JSON.stringify(result_data))
                     
                        $('#searchBoxCatagory1_Au').empty();
                        $('#searchBoxCatagory1_Au').append('<option disabled selected style="display:none;">Select a category</option>');
                        $('#searchBoxCatagory1_Au').append('<option value="-1">All categories</option>');
                        $.each(result_data.category, function(idx, obj)
                        {
                              // alert(idx);
                            $('#searchBoxCatagory1_Au').append('<option value="'+idx+'">'+obj+'</option>');
                              
                               key=idx+"";
                               //catOne={idx:obj};
//                               console.log(key + "    -------"+ key.length);
                               objX[key]=obj;
                               
                              // alert(JSON.stringify(catOne));
                        });
//     alert(objX[319+""]);
                     
                     }
                     else
                     {
                        $('#searchBoxCatagory1_Au').empty();
                        $('#searchBoxCatagory1_Au').append('<option disabled selected style="display:none;">Select a category</option>');
                        $('#searchBoxCatagory1_Au').append('<option selected="selected">All categories</option>');
                     }
                     $('#searchBoxCatagory1_Au').selectmenu('refresh');
                     }
                     catch(ex)
                     {
                        alert('catch '+JSON.stringify(ex));
                     }
                     loadstates_Au();
                     loadMakesSearchscreen_AU();
             },
             function(result_data)
             {
                    //    navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                        loadstates_Au();
             });
    
}
/***************************************************************************

 Function to LOAD CATAGORIES on  "pageSearchScreen" for PRIVATE SALES
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *****************************************************************************/
function loadCatagories1PRivate_AU()
{

    $('#searchBoxCatagory2_Au').selectmenu();
    $('#searchBoxModel_AU').selectmenu();
    
    
    $('#checkbox_container_AU').empty();
    $('#searchBoxCatagory2_Au').empty();
    $('#catagory3Continer_AU').empty();
    $('#trucksearch_keywordAU').val('');
    
    $('#searchBoxCatagory2_Au').append('<option disabled selected style="display:none;">Select a sub-category</option>');
    $('#searchBoxCatagory2_Au').append('<option value="-1">All sub-categories</option>');
    $('#searchBoxCatagory2_Au').trigger('create');
    $('#searchBoxCatagory2_Au').selectmenu('refresh');
    
    $('#searchBoxModel_AU').empty();
    $('#searchBoxModel_AU').append('<option disabled selected style="display:none;">Select a model</option>');
    $('#searchBoxModel_AU').trigger('create');
    $('#searchBoxModel_AU').selectmenu('refresh');
    
    
  
 
    $('#checkbox_container_AU').append('<input type="checkbox" checked="checked"  value="private_used" name="chnk_dealr" id="dealer_used" class="abc_ab"><label for="dealer_used"> Used </label>');
    $('.abc_ab').prop('disabled', true);
    $('#checkbox_container_AU').trigger('create');
    
    $('#dealer_clicked').css('background','#E8E4E4');
    $('#dealer_clicked').trigger('create');
    
    $('#private_clicked').css('background','grey');
    $('#private_clicked').trigger('create');
    $('#search_btn_hmePge').attr('dealr_atri','type[]=private_used&')
    var getcatg1_Json={"action":"getCategory"};
    getcatg1_Json=JSON.stringify(getcatg1_Json);
    console.log('getcatg1_Json -- '+getcatg1_Json);
    //Backend API invokation to retreive catagory 1
    service.ajaxCall(getcatg1_Json,function(result_data){
                     try{
                     $('#searchBoxCatagory1_Au').selectmenu();
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                     {
                     
                        $('#searchBoxCatagory1_Au').empty();
                        $('#searchBoxCatagory1_Au').append('<option disabled selected style="display:none;">Select a category</option>');
                        $('#searchBoxCatagory1_Au').append('<option value="-1">All categories</option>');
                        $.each(result_data.category, function(idx, obj)
                            {
                               $('#searchBoxCatagory1_Au').append('<option value="'+idx+'">'+obj+'</option>');
                            });
                     }
                     else
                     {
                        $('#searchBoxCatagory1_Au').empty();
                        $('#searchBoxCatagory1_Au').append('<option disabled selected style="display:none;">Select a category</option>');
                        $('#searchBoxCatagory1_Au').append('<option selected="selected">All categories</option>');
                     }
                        $('#searchBoxCatagory1_Au').selectmenu('refresh');
                     }
                     catch(ex)
                     {
                        alert('catch '+JSON.stringify(ex));
                     }
                     loadstates_Au();
                     loadMakesSearchscreen_AU();
                     },
                     function(result_data)
                     {
                        navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                        loadstates_Au();
                     });
    
}




/*******************************************************************
 Function to place states on SELECT BOX  "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *********************************************************************/

function loadstates_Au()
{
    //alert('ststes');
    $('#searchBoxstate_AU').selectmenu();
    var getstates_Json={
                        "action":"getState"
                      };
    getstates_Json=JSON.stringify(getstates_Json);
    console.log('getstates_Json -- '+getstates_Json);
    service.ajaxCall(getstates_Json,function(result_data){
                      $('#searchBoxstate_AU').selectmenu();
                      console.log('getstates_Json -- '+getstates_Json);
            try{
                     if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                     {
                        $('#searchBoxstate_AU').empty();
                        $('#searchBoxstate_AU').append('<option disabled selected style="display:none;">Select a state</option>');
                        $('#searchBoxstate_AU').append('<option value="-1">All States</option>');
                        $.each(result_data.States, function(idx, obj)
                        {
                           $('#searchBoxstate_AU').append('<option value="'+idx+'">'+obj+'</option>');
                        });
                     }
                     else
                     {
                        $('#searchBoxstate_AU').empty();
                        $('#searchBoxstate_AU').append('<option disabled selected style="display:none;">Select a state</option>');
                        $('#searchBoxstate_AU').append('<option selected="selected">All States</option>');
                     }
                        $('#searchBoxstate_AU').selectmenu('refresh');
                     }
                     catch(ex)
                     {
                       // alert('catch states'+JSON.stringify(ex));
                     }
                },
                function(result_data)
                {
                   // navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                });

                     
}
/*******************************************************************
 Function to PLACE MAKES on SELECT BOX  "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
*********************************************************************/
var makeArr={}
function loadMakesSearchscreen_AU()
{
    
    var getmake_Json={"action":"getMake"};
    getmake_Json=JSON.stringify(getmake_Json);
    console.log('getmake_Json -- '+getmake_Json);
    service.ajaxCall(getmake_Json,function(result_data){
                     try
                     {
                         $('#searchBoxMake_Au').selectmenu();
                        if(result_data.responseCode == 200 || result_data.responseMessage == 'Makes Fetched successfully.')
                        {
                            $('#searchBoxMake_Au ').empty();
                            $('#searchBoxMake_Au ').append('<option disabled selected style="display:none;">Select a make</option>');
                            $('#searchBoxMake_Au ').append('<option value="-1">All makes</option>');
                            for(var i=0;i<result_data.Makes.length;i++)
                            {
                                $('#searchBoxMake_Au').append('<option value="'+result_data.Makes[i].id+'">'+result_data.Makes[i].name+'</option>');
                                var key=result_data.Makes[i].name+"";
                                makeArr[key]=result_data.Makes[i].id;
                            }
                        }
                        else
                        {
                            $('#searchBoxMake_Au').empty();
                            $('#searchBoxMake_Au').append('<option disabled selected style="display:none;">Select a make</option>');
                            $('#searchBoxMake_Au').append('<option selected="selected">All makes</option>');
                        }
                            $('#searchBoxMake_Au').selectmenu('refresh');
                     }
                     catch(ex)
                     {
                        alert('catch MAKES'+JSON.stringify(ex));
                     }
                },
                function(result_data)
                {
                     navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                });
    
}

/*****************************************************************************************
 Function to PLACE MODELS on SLECTING VAL FROM MAKES SELECT BOX  "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *******************************************************************************************/
function loadMODELS_AU(textSelected)
{
 //alert('MODELS')
    var getmodels_Json={"action":"getModel",
                        "make":textSelected
                        };
    getmodels_Json=JSON.stringify(getmodels_Json);
    console.log('getmodels_Json -- '+getmodels_Json);
    
    //Backend API invocation to retreive catagory 2
    service.ajaxCall(getmodels_Json,function(result_data){
                     try{
                        $('#searchBoxModel_AU').selectmenu();
                        if(result_data.responseCode == 200 || result_data.responseMessage == 'Model Fetched successfully.')
                        {
                            $('#searchBoxModel_AU').empty();
                            $('#searchBoxModel_AU').append('<option disabled selected style="display:none;">Select a model</option>');
//                            $('#searchBoxModel_AU').append('<option>All models</option>');
                            for(var i=0;i<result_data.category.length;i++)
                            {
                                $('#searchBoxModel_AU').append('<option value="'+result_data.category[i].id+'">'+result_data.category[i].name+'</option>');
                            }
                        }
                        else
                        {
                            $('#searchBoxModel_AU').empty();
                            $('#searchBoxModel_AU').append('<option disabled selected style="display:none;">Select a model</option>');
//                            $('#searchBoxModel_AU').append('<option selected="selected">All makes</option>');
                        }
                        $('#searchBoxModel_AU').selectmenu('refresh');
                     }
                     catch(ex)
                     {
                        alert('catch MAKES'+JSON.stringify(ex));
                     }
                },
                function(result_data)
                {
                     navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
                });
}
$(document).on('change','#searchBoxMake_Au',function(){
               
               var optionSelected = $(this).find("option:selected");
               var textSelected   = optionSelected.text();
             //alert(' textSelected '+textSelected)
               if(textSelected == 'Select a make' || textSelected == 'All makes')
               {
                    $('#searchBoxModel_AU').empty();
                    $('#searchBoxModel_AU').append('<option disabled selected style="display:none;">Select a model</option>');
//                    $('#searchBoxModel_AU').append('<option>All models</option>');
               }
               else
               {
                    loadMODELS_AU(textSelected);
               }
});

/*******************************************************
ON CLICK OF RED SEARCH BUTTON pageSearchScreen
Function to search trucks on the  "pageSearchScreen"
AUTHOR             :Ameeduddin
INPUT PARAMETERS   :
*********************************************************/
var page=1;
var queryString_truckSearch='';
var numOfPage;
var savesearch;
var quwerystringSved;
function searchTrucks_Au()
{
    page=1;
    var chkbox_value='';
    var searchKey_AU=$('#trucksearch_keywordAU').val();
    var selctdcatag3_trucksearch='';
    var selctdcatag1_trucksearch=$("#searchBoxCatagory1_Au option:selected").text();
    var selctdcatag2_trucksearch=$("#searchBoxCatagory2_Au option:selected").text();
    
    if(searchKey_AU == '' || searchKey_AU == null)
    {
        searchKey_AU = '';
    }
    else
    {
        searchKey_AU ='keyword='+searchKey_AU;
    }
   
    $('#checkbox_container_AU input:checked').each(function()
    {
        chkbox_value=chkbox_value+'type[]='+$(this).val()+'&';
    });
    
    if(chkbox_value == '' || chkbox_value == undefined || chkbox_value == null )
    {
        chkbox_value=chkbox_value+$('#search_btn_hmePge').attr('dealr_atri');
        
    }

    
    if(selctdcatag1_trucksearch == 'Select a category' || selctdcatag1_trucksearch == 'All categories' ){
                selctdcatag1_trucksearch = '';
            
     }
    else
    {
            selctdcatag1_trucksearch ='cat_1_id='+$("#searchBoxCatagory1_Au option:selected").val()+'&';
   }
   
        if(selctdcatag2_trucksearch == 'Select a sub-category' || selctdcatag2_trucksearch == 'All sub-categories'){
            selctdcatag2_trucksearch = '';
            
        }
        else
        {
            
            selctdcatag2_trucksearch ='cat_2_id='+$("#searchBoxCatagory2_Au option:selected").val().split('_')[0]+'&';
           
        }
//    alert('selctdcatag2_trucksearch'+selctdcatag2_trucksearch)
    if( ($('#catagory3Continer_AU').has('select').length ? "Yes" : "No") == 'Yes')
    {
        selctdcatag3_trucksearch=$("#searchBoxCatagory3_Au option:selected").text();
        if(selctdcatag3_trucksearch == 'Select a sub-category' || selctdcatag3_trucksearch == 'All sub-categories'){
            selctdcatag3_trucksearch = '';
        }
        else
        {
            selctdcatag3_trucksearch='cat_3_id='+$("#searchBoxCatagory3_Au option:selected").val()+'&';
        }
       
    }
//     alert('selctdcatag3_trucksearch '+selctdcatag3_trucksearch);
    var selctdmake_trucksearch=$("#searchBoxMake_Au option:selected").text();
        if(selctdmake_trucksearch == 'Select a make' || selctdmake_trucksearch == 'All makes'){
          // alert('MAKE if')
            selctdmake_trucksearch = '';
        }
        else
        {
          //  alert('MAKE else')
            selctdmake_trucksearch = 'make='+selctdmake_trucksearch+'&';
        }
//    alert('selctdmake_trucksearch '+selctdmake_trucksearch);
    var selctdmodel_trucksearch=$("#searchBoxModel_AU option:selected").text();
        if(selctdmodel_trucksearch == 'Select a model' || selctdmodel_trucksearch == 'All models' || selctdmodel_trucksearch == 'All Models'){
            selctdmodel_trucksearch = '';
//            alert('if models '+selctdmodel_trucksearch)
        }
        else
        {
            //alert('else models '+selctdmodel_trucksearch)
            selctdmodel_trucksearch = 'model='+selctdmodel_trucksearch+'&';
        }
//    alert('selctdmodel_trucksearch '+selctdmodel_trucksearch)
    var selctdstate_trucksearch=$("#searchBoxstate_AU option:selected").text();
        if(selctdstate_trucksearch == 'Select a state' || selctdstate_trucksearch == 'All States'){
           // alert('selctdstate_trucksearch   '+selctdstate_trucksearch)
            selctdstate_trucksearch = '';
        }
        else
        {
//            alert('selctdstate_trucksearch   '+selctdstate_trucksearch);
            selctdstate_trucksearch = 'state='+$("#searchBoxstate_AU option:selected").val()+'&';
        }
//    alert('selctdstate_trucksearch '+selctdstate_trucksearch);
    var selctdminprice_trucksearch = $("#searchBox_minprice_AU option:selected").text();
        if(selctdminprice_trucksearch == 'Min price'){
            selctdminprice_trucksearch = '';
        }
        else
        {
            selctdminprice_trucksearch = 'price_min='+$("#searchBox_minprice_AU option:selected").val()+'&';
        }
//    alert('selctdminprice_trucksearch '+selctdminprice_trucksearch);
    var selctdmaxprice_trucksearch = $("#searchBox_maxprice_AU option:selected").text();
        if(selctdmaxprice_trucksearch == 'Max price'){
            selctdmaxprice_trucksearch = '';
        }
        else
        {
            selctdmaxprice_trucksearch = 'price_max='+$("#searchBox_maxprice_AU option:selected").val()+'&';
        }
    
   queryString_truckSearch = 'https://truckdealersaustralia.com.au/api/search/?'+selctdcatag1_trucksearch+selctdcatag2_trucksearch+selctdcatag3_trucksearch+selctdmake_trucksearch+selctdmodel_trucksearch+selctdstate_trucksearch+selctdminprice_trucksearch+selctdmaxprice_trucksearch+chkbox_value+searchKey_AU;
  
//    alert('queryString_truckSearch '+queryString_truckSearch + " last character  "+queryString_truckSearch.slice(-1));
    if(queryString_truckSearch.slice(-1) == '&')
    {
        queryString_truckSearch = queryString_truckSearch.substring(0, queryString_truckSearch.length - 1);
    }
 //alert('queryString_truckSearch '+queryString_truckSearch );
    console.log('quryurl  '+queryString_truckSearch)
  
    searchResult(queryString_truckSearch);
//    return queryString_truckSearch;
    
}

/*******************************************************
 Function to navigate to  "pageSearchScreen"
 AUTHOR             :Ameeduddin
 INPUT PARAMETERS   :
 *********************************************************/

//GLOBAL VARIBLE TO STORE THE TRUCK LIST DATA OBTAINED FROM  "searchResult() FUNCTION"

var trukListData_AU;

function searchResult(qry_urlIn)
{
    qry_urlIn=qry_urlIn+'&page='+page;
     console.log('qry_urlIn  '+qry_urlIn)

    //getTruckDetails_AU();
    spinnerplugin.show();
    $.ajax({
                type: "GET",
                url:qry_urlIn,
                contentType: "application/json",
                dataType: "json",
                beforeSend:function(){
                },
                complete:function(){
                },
                success: function(result)
                {
                    console.log('string '+JSON.stringify(result));
                    var total=result.hits.total;
                    numOfPage=Math.ceil(total/100);
                        //alert(numOfPage);
                    if(numOfPage>0&&numOfPage>=page){
           
                            page++;
           
           
                    }
                    if(result.hits.total > 0){
                        trukListData_AU=result;
                        console.log(' trukListData_AU   string '+JSON.stringify(trukListData_AU));
                        localStorage.setItem('saveSearch_truckList',qry_urlIn);
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
                error: function(){
                    spinnerplugin.hide();
                    navigator.notification.alert('Cannot connect to server', function(){},'TDA','OK');
                   // $.mobile.changePage("#pageSearchResult", {transition:"none"})
                }
           });

}




function addMoreResults(){
    if(numOfPage==1){
        return;
    }
    var qry_urlIn=queryString_truckSearch+'&page='+page;
   //  alert('addMoreResults  qry_urlIn  '+qry_urlIn);
    console.log('NEW Query qry_urlIn  '+qry_urlIn)
    if(savesearch==1){
        qry_urlIn=quwerystringSved;
        
    }
    
    //getTruckDetails_AU();
    spinnerplugin.show();
    $.ajax({
           type: "GET",
           url:qry_urlIn,
           contentType: "application/json",
           dataType: "json",
           beforeSend:function(){
           },
           complete:function(){
           },
           success: function(result){
                if(numOfPage>0&&numOfPage>page){
                    page++;
                }
                    console.log('string refresh '+JSON.stringify(result));
                if(result.hits.total > 0){
                        trukListData_AU=result;
                        console.log(' trukListData_AU   string '+JSON.stringify(trukListData_AU));
                        localStorage.setItem('saveSearch_truckList',qry_urlIn);
                        spinnerplugin.hide();
                        displayTruckList_AU(result);
                        //$.mobile.changePage("#pageSearchResult", {transition:"slide"})
                }
                else{
                    spinnerplugin.hide();
                    navigator.notification.alert('No listings matched your specific search criteria.', function(){},'TDA','OK');
                    //$.mobile.changePage("#pageSearchResult", {transition:"none"})
                }
           
           
           },
           error: function(){
                    spinnerplugin.hide();
                    navigator.notification.alert('Cannot connect to server', function(){},'TDA','OK');
                    // $.mobile.changePage("#pageSearchResult", {transition:"none"})
           }
    });
    
}

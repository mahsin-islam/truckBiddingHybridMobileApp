                                                    //THIS FILE CONTAINS FUNCTIONALITIES OF SORTING ON THE TRUCK LISTING SCREEN
                                                                        //Author : Ameeduddin
/*---------------------------------------------------------------------------------------------------------
 Function to  display Step 1 screen of  
--------------------------------------------------------------------------------------------------------- */

function clickAddNewList()
{
    imgearray.length=0;
  if(loginstatus==0)
  {
    $.mobile.changePage("#pageLogin", {transition:"none"})
  }
  else
  {
    console.log('TYPE click add listing '+user.Type);
    
    $('#add_Heading').val("");
    $('#add_year').val("");
    $('#add_price').val("");
    
    $('#addStock').selectmenu();
    $('#addStock').val("");
    $('#addStock').selectmenu('refresh', true);
    
    $('#add_Make').selectmenu();
    $('#add_Make').val("");
    $('#add_Make').selectmenu('refresh', true);
    
    $('#add_Model').selectmenu();
    $('#add_Model').val("");
    $('#add_Model').selectmenu('refresh', true);
    
    $('#add_Category').selectmenu();
    $('#add_Category').val("-5");
    $('#add_Category').selectmenu('refresh', true);
    
    $('#add_SubCategory').selectmenu();
    $('#add_SubCategory').val("0_0");
    $('#add_SubCategory').selectmenu('refresh', true);
      
    
    if(window.localStorage.getItem("user_Type") != 'Dealer')
    {
        console.log('window.localStorage.getItem("user_Type") \n\n\n'+window.localStorage.getItem("user_Type"));
        $('#cntainer_addStock').empty();
        $('#step1_type').empty();
        $('#gst_chckbox').empty();
    }
    else
    {
        console.log('dealer\nwindow.localStorage.getItem("user_Type") \n\n\n'+window.localStorage.getItem("user_Type"));
        $('#cntainer_addStock').empty();
        $('#step1_type').empty();
        $('#gst_chckbox').empty();
        
        $('#cntainer_addStock').append('<input name="text-basic" id="add_Stock" value="" name="stockrefno" placeholder="Dealer stock ref #" type="text">');
        $('#step1_type').append('<select  name="select-choice-1"  id="add_Type"><option disabled selected style="display:none;" value="null">Type</option><option value="dealer_new">Dealer New</option><option value="dealer_used">Dealer Used</option><option value="dealer_demo">Dealer Demo</option></select>');
        $('#gst_chckbox').append('<span class="left">Include GST:</span><span class="right" id="add_GST"><span class="top views-radios"><label><input name="radio-choice-0" id="radio-choice-0a" type="radio">Yes</label></span><span class="bottom views-radios"><label for="radio-choice-0b">No</label><input name="radio-choice-0" id="radio-choice-0b" class="custom" type="radio"></span></span>');
        
        $('#cntainer_addStock').trigger('create');
        $('#step1_type').trigger('create');
        $('#gst_chckbox').trigger('create');
        
    }
    $('#step2button').attr('step2selectn','Add')
    $.mobile.changePage("#pageAddNewStep1", {transition:"none"});
  }
}

/************************************************************************
 Function to  CREATE  SCREEN STEP 2  of ADD A ANEW LIST
 AUTHOR :Ameeduddin
*************************************************************************/
var topatrr; // ARRAY CONTAINING TOP PARAMETERS

function contructPge2Addlst(indata)
{
    try
    {
    console.log(' indata--  '+JSON.stringify(indata));
    $('#topbox_CA').empty();
    $('#add_description').val('');
        
    if(indata.categoryAttributes.hasOwnProperty('settings'))
    {
        if(indata.categoryAttributes.settings != null && indata.categoryAttributes.settings != "NULL"  && indata.categoryAttributes.settings != "null" && indata.categoryAttributes.settings != "")
        {
            topatrr = indata.categoryAttributes.settings.split(',');
            
            $('#topbox_CA').empty();
            $('#topbox_CA').append('<input id="add_enqPhone" name="enquiry_phone"  placeholder="Enquiry Phone Number" type="text">');
            for(var i=0;i<topatrr.length;i++)
            {
                 var tt = capitalize(topatrr[i].replace(/_/g, ' ')) ;
                $('#topbox_CA').append('<input id="'+topatrr[i]+'" class="'+topatrr[i]+'" name="'+topatrr[i]+'"  placeholder="'+tt+'" type="text">')
            }
        }
        
    }
    else
    {
        $('#topbox_CA').empty();
        $('#topbox_CA').append('<input id="add_enqPhone" name="enquiry_phone"  placeholder="Enquiry Phone Number" type="text">');
    }
    $('#topbox_CA').trigger('create');
    
    //----------------NEXT SECTION----------------------
    $('#cutomattrfields').empty();
    if(indata.categoryAttributes.set_name!=null && indata.categoryAttributes.set_name !="null" )
    {
        $('#cutomattrfields').append('<h3>'+indata.categoryAttributes.set_name+'</h3>')
    }
    if(indata.categoryAttributes.set_data != null && indata.categoryAttributes.set_data != "null")
    {
        for(var ib=0;ib<indata.categoryAttributes.set_data.length;ib++)
        {
            if(indata.categoryAttributes.set_data[ib].type == 'Textbox'  )
            {
                var class_attr = indata.categoryAttributes.set_data[ib].name;
                if( class_attr.search(" ") >-1)
                {
                    class_attr = class_attr.replace(/\s+/g, '_')
                }
                $('#cutomattrfields').append('<div class="view-row clearfix"><input class="'+class_attr+'"  id="customatr_'+ib+'" name="'+indata.categoryAttributes.set_data[ib].name+'"  placeholder="'+indata.categoryAttributes.set_data[ib].name+'" type="text"></div>')
                console.log('THIS >CLASS   \n'+class_attr+'\n  '+indata.categoryAttributes.set_data[ib].name);
                
            }
            else if(indata.categoryAttributes.set_data[ib].type =='Heading')
            {
                 $('#cutomattrfields').append('<h3>'+indata.categoryAttributes.set_data[ib].name+'</h3>')
            }
            else if(indata.categoryAttributes.set_data[ib].type == 'Select')
            {
                try
                {
                var class_attr = indata.categoryAttributes.set_data[ib].name;
                if( class_attr.search(" ") >-1)
                {
                        class_attr = class_attr.replace(/\s+/g, '_')
                }
                $('#cutomattrfields').append('<div class="view-row clearfix"><select class="'+class_attr+'"  id="customstrselect_ib'+ib+'" name="'+indata.categoryAttributes.set_data[ib].name+'" ><option disabled selected style="display:none;">'+indata.categoryAttributes.set_data[ib].name+'</option></select></div>');
                
                var selectid='#customstrselect_ib'+ib;
                    
                    $(selectid).selectmenu();
                    for(var jp=0;jp<indata.categoryAttributes.set_data[ib].opts.length;jp++)
                    {
                        console.log('SELECT VALUE =   '+indata.categoryAttributes.set_data[ib].opts[jp]);
                        $(selectid).append('<option value="'+indata.categoryAttributes.set_data[ib].opts[jp]+'">'+indata.categoryAttributes.set_data[ib].opts[jp]+'</option>');
                    }
                    
                      $(selectid).selectmenu('refresh');
                    
                }
                catch(ex)
                {
                    alert(ex);
                }
            }
            else if(indata.categoryAttributes.set_data[ib].type == 'Checkbox')
            {
                try{
                    var class_attr = indata.categoryAttributes.set_data[ib].name;
                    if( class_attr.search(" ") >-1)
                    {
                        class_attr = class_attr.replace(/\s+/g, '_')
                    }
                    $('#cutomattrfields').append('<div class="view-row clearfix"><div data-role="fieldcontain" class="'+class_attr+'" id="checkbox_'+ib+'"> <fieldset data-role="controlgroup"><legend>'+indata.categoryAttributes.set_data[ib].name+'</legend> </fieldset></div></div>');
                    var chckboxid = '#checkbox_'+ib;
                    
                    for(var jp=0;jp<indata.categoryAttributes.set_data[ib].opts.length;jp++)
                    {
                        $(chckboxid).append('<input type="checkbox" value="'+indata.categoryAttributes.set_data[ib].opts[jp]+'" name="'+indata.categoryAttributes.set_data[ib].name+'" id="'+indata.categoryAttributes.set_data[ib].opts[jp]+'" class="'+indata.categoryAttributes.set_data[ib].opts[jp]+'" ><label for="'+indata.categoryAttributes.set_data[ib].opts[jp]+'">'+indata.categoryAttributes.set_data[ib].opts[jp]+'</label>');
                    }

                    $('#chckboxid').trigger('create');
                    
                    
                }
                catch(ex)
                {
                    alert("ameed ex"+ex);
                }
            }
            
        }
//        $('#cutomattrfields').trigger('create');
        
    }

//------------------------------------SUB CATEGORY FIELDS SECTION------------------------------

    if(indata.subCategoryAttributes.hasOwnProperty('set_data')  )
    {
     
   // alert('fffdsfdfsf')
        if(indata.subCategoryAttributes.hasOwnProperty('settings') )
        {
            if(indata.subCategoryAttributes.settings != null && indata.subCategoryAttributes.settings != 'null' && indata.subCategoryAttributes.settings != '')
            {
                araytop = indata.subCategoryAttributes.settings.split(',');
                
                for(var i=0;i<araytop.length;i++)
                {
                    $('#cutomattrfields').append('<input id="'+araytop[i]+'" class="'+araytop[i]+'"  name="'+araytop[i]+'" placeholder="'+araytop[i]+'" type="text">')
                }
            }
            
        }
        if(indata.subCategoryAttributes.set_data != null && indata.subCategoryAttributes.set_data != "null")
        {
            if(indata.subCategoryAttributes.set_name != null && indata.subCategoryAttributes.set_name != "null")
            {
                $('#cutomattrfields').append('<h3>'+indata.subCategoryAttributes.set_name+'</h3>')
            }
        for(var ib=0;ib<indata.subCategoryAttributes.set_data.length;ib++)
        {
            if(indata.subCategoryAttributes.set_data[ib].type == 'Textbox'  )
            {
                var class_attr = indata.subCategoryAttributes.set_data[ib].name;
                if( class_attr.search(" ") >-1)
                {
                    class_attr = class_attr.replace(/\s+/g, '_')
                }
                $('#cutomattrfields').append('<div class="view-row clearfix"><input class="'+class_attr+'"  id="subcustomatr_'+indata.subCategoryAttributes.set_data[ib].name+'" name="'+indata.subCategoryAttributes.set_data[ib].name+'" placeholder="'+indata.subCategoryAttributes.set_data[ib].name+'" type="text"></div>')
                
            }
            else if(indata.subCategoryAttributes.set_data[ib].type =='Heading')
            {
                $('#cutomattrfields').append('<h3>'+indata.subCategoryAttributes.set_data[ib].name+'</h3>')
            }
            else if(indata.subCategoryAttributes.set_data[ib].type == 'Select')
            {
                var class_attr = indata.subCategoryAttributes.set_data[ib].name;
                if( class_attr.search(" ") >-1)
                {
                    class_attr = class_attr.replace(/\s+/g, '_')
                }
                $('#cutomattrfields').append('<div class="view-row clearfix"><select  class="'+class_attr+'" id="subcustomatr_'+indata.subCategoryAttributes.set_data[ib].name+'" name="'+indata.subCategoryAttributes.set_data[ib].name+'"><option disabled selected style="display:none;">'+indata.subCategoryAttributes.set_data[ib].name+'</option></select></div>');
                
                var selectid='#subcustomatr_'+ib;
                
                
                for(var jp=0;jp<indata.subCategoryAttributes.set_data[ib].opts.length;jp++)
                {
                    
                    $(selectid).append('<option value="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'">'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'</option>');
                }
                $(selectid).trigger('create');
//                $.each(indata.subCategoryAttributes.set_data[ib].opts,function(selvl)
//                       {
//                       $(selectid).append('<option value="'+selvl+'">'+selvl+'</option>');
//                       });
            }
            else if(indata.subCategoryAttributes.set_data[ib].type == 'Checkbox')
            {
               // alert('chbox 2')
                try
                {
                    var class_attr = indata.subCategoryAttributes.set_data[ib].name;
                    if( class_attr.search(" ") >-1)
                    {
                        class_attr = class_attr.replace(/\s+/g, '_')
                    }
                    $('#cutomattrfields').append('<div class="view-row clearfix"><div data-role="fieldcontain" class="'+class_attr+'"  id="zcheckbox_'+ib+'"> <fieldset data-role="controlgroup"><legend>'+indata.subCategoryAttributes.set_data[ib].name+'</legend> </fieldset></div></div>');
                    var chckboxid = '#zcheckbox_'+ib;
                    
                    for(var jp=0;jp<indata.subCategoryAttributes.set_data[ib].opts.length;jp++)
                    {
                        console.log('Devil   '+indata.subCategoryAttributes.set_data[ib].opts[jp]);
                        $(chckboxid).append('<input type="checkbox" value="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'" name="'+indata.subCategoryAttributes.set_data[ib].name+'" class="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'" id="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'" ><label for="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'">'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'</label>');
                         console.log('Devil  dvl '+$(chckboxid).html());
                       // $(chckboxid).append('<input type="checkbox" name="checkbox-1" id="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'" class="custom" /><label for="'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'">'+indata.subCategoryAttributes.set_data[ib].opts[jp]+'</label>');
                        
                        
                        
                        
                    }
//                    $.each(indata.subCategoryAttributes.set_data[ib].opts,function(chckbxvl)
//                       {
//                        console.log('checkbox VALUE =   '+chckbxvl);
//                        $(chckboxid).append('<input type="checkbox" value="'+chckbxvl+'" name="optionbox" id="'+chckbxvl+'" ><label for="'+chckbxvl+'">'+chckbxvl+'</label>');
//                       });
                    $(chckboxid).trigger('create');
                }
                catch(ex)
                {
                    alert(ex);
                }
            }
            
        }
        //        $('#cutomattrfields').trigger('create');
    }
    }
    }
    catch(ex)
    {
        alert('page create '+ex)
    }

    $('#cutomattrfields').trigger('create');
    
    if( $('#step2button').attr('step2selectn') == 'Edit')
    {
        plcedataEditlist();
        console.log('0000000000000000 \n  '+$('#step2button').attr('step2selectn') )
    }
    
    $.mobile.changePage("#pageAddNewStep2", {transition:"none"})
  
    
}


/*---------------------------------------------------------------------------------------------------------
 Function to  get data for the  SCREEN STEP 2  of ADD A ANEW LIST
 --------------------------------------------------------------------------------------------------------- */

function dspsteptwo_Adlst()
{

    var cat1_val = $('#add_Category').val();
    var cat2_val =  $('#add_SubCategory').val().split('_')[0];
    
    if(cat2_val == undefined || cat2_val== "-5" || cat2_val == null)
    {
        cat2_val = 0;
    }
    if( cat1_val == undefined || cat1_val== "-5" || cat1_val == null)
    {
        navigator.notification.alert('Select a category',function(){},'TDA','OK');
    }
    else if($('#add_Heading').val().trim() == "")
    {
        navigator.notification.alert('Heading is required',function(){},'TDA','OK');
    }
    else if($('#addStock').val().trim() == "")
    {
        navigator.notification.alert('Stock location is required',function(){},'TDA','OK');
    }
    else
    {
        var nextpageget_Json={  "action"  :"getCustomAttributes",
                                "catID"   : cat1_val,//"16",
                                "subCatID": cat2_val//"192"
                              }
        nextpageget_Json = JSON.stringify(nextpageget_Json);
        console.log('nextpageget_Json  '+nextpageget_Json);
        //alert('dspsteptwo_Adlst    '+nextpageget_Json );
        service.ajaxCall(nextpageget_Json,function(result_data){
                            console.log(' result_data --  '+JSON.stringify(result_data));
                            contructPge2Addlst(result_data);
                         
                         },
                         function(result_data){
                            navigator.notification.alert('Server error ',function(){},'TDA','OK');
                         });
        
    }
}



/************************************************************************************************
function to get the values of all data on step 2
Author Ameeduddin
*************************************************************************************************/




$.fn.serializeObject = function()
{
    var custom_attributes=[];
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
           if (o[this.name] !== undefined)
           {
              // alert('11  this.name  '+this.name+' \n    '+this.value )
                if (!o[this.name].push)
                {
                    o[this.name] = [o[this.name]];
           
           
                if(this.name != 'Options')
                {
                    custom_attributes.push({ "name":this.name,
                                            "value":o[this.name]
                                            });
                }
                else
                {
                    if( Object.prototype.toString.call( o[this.name] ) === '[object Array]' )
                    {
                        custom_attributes.push({ "name":this.name,
                                                "value":o[this.name]
                                              });

                    }
                }
           
           
                }
                o[this.name].push(this.value || '');
                var arr_value = this.value;
                if(this.value == null || this.value == '' || this.value == undefined)
                {
                    arr_value="";
                }
           
                if(this.name != 'Options')
                {
                        custom_attributes.push({
                                                    "name":this.name,
                                                    "value":arr_value
                                               });
                }
                else
                {
                    if( Object.prototype.toString.call( arr_value) === '[object Array]' )
                    {
                            custom_attributes.push({
                                                    "name":this.name,
                                                    "value":arr_value
                                                    });
           
                    }
                }
           
           }
           else
           {
           
                o[this.name] = this.value || '';
                var arr_value = this.value;
                if(this.value == null || this.value == '' || this.value == undefined)
                {
                    arr_value="";
                }
                if(this.name != 'Options')
                {
                        custom_attributes.push({
                                                "name":this.name,
                                                "value":arr_value
                                               });

                }
                else
                {
                    if( Object.prototype.toString.call( arr_value ) === '[object Array]' )
                    {
                        custom_attributes.push({
                                                "name":this.name,
                                                "value":arr_value
                                                });

           
                    }
                }
           }
    });
    console.log('p   o      ---\n '+JSON.stringify(o));
    console.log('custom_attributes      ---\n '+JSON.stringify(custom_attributes));
    return custom_attributes;
};




function getallFormvalues()
{
    console.log('MY ADDRESS  '+window.localStorage.getItem('myAdd'));
    var op = {};
    
    
    
    if( $('#add_description').val()=='')
    {
        navigator.notification.alert('Please provide item description ',function(){},'TDA','OK');
        return;
    }
    else
    {
        op["description"] = $('#add_description').val();
    }
    
    var usuid=user.Id;
    if(usuid == '')
    {
        usuid="0";
    }
    
   // iniyialization
    op["headline"]="";
    op["make"]  = "";
    op["model"] = "";
    op["enquiry_phone"] = "";
    op["price_type"]="";
    op["fastrack_type"]="";
    op["fastrack_subtype"]="";
    op["fastrack_listing_id"]="";
    op["inc_gst"]="";
    op["vin"]="";
    op["gcm"]="";
    op["engine_power"]="";
    op["engine_capacity"]="";
    op["odometer"]="";
    op["hours"]="";
    op["industry"]=""
    op["serial_number"]=""
  //Assign values
    
    op["action"]="addListing";
    op["userID"]=usuid
   
    
    op["headline"]=$('#add_Heading').val();
    op["enquiry_phone"] =$('#add_enqPhone').val();
    op["stock_location"]=$('#addStock').val();
    
    if($('#add_GST').attr('name') != undefined)
    {
        if(document.getElementById('radio-choice-0a').checked)
        {
            op["inc_gst"]=1;
        }
        else if(document.getElementById('radio-choice-0b').checked)
        {
            op["inc_gst"]=0;
        }
    }
   // alert($('#odometer').attr('name'))
    if($('#odometer').attr('name') != undefined && $('#odometer').val() != '' && $('#odometer').val() != null)
    {
       // alert('ddddddd')
        op["odometer"]=$('#odometer').val();
    }
    if($('#vin').attr('name') != undefined && $('#vin').val() != '' && $('#vin').val() != null)
    {
        op["vin"]=$('#vin').val();
    }
    if($('#gcm').attr('name') != undefined && $('#gcm').val() != '' && $('#gcm').val() != null)
    {
        op["gcm"]=$('#gcm').val();
    }
    if($('#hours').attr('name') != undefined && $('#hours').val() != '' && $('#hours').val() != null)
    {
        op["hours"]=$('#hours').val();
    }
    if($('#engine_power').attr('name') != undefined && $('#engine_power').val() != '' && $('#engine_power').val() != null)
    {
        op["engine_power"]=$('#engine_power').val();
    }
    if($('#engine_capacity').attr('name') != undefined && $('#engine_capacity').val() != '' && $('#engine_capacity').val() != null)
    {
        op["engine_capacity"]=$('#engine_capacity').val();
    }

    
    
    if(op["stock_location"] == undefined || op["stock_location"] == null || op["stock_location"] == '')
    {
         op["stock_location"]=''
    }
    op["cat_1_id"]   = $('#add_Category').val();
    op["cat_1_name"] = $('#add_Category').find("option:selected").text();
    op["cat_2_id"]   = $('#add_SubCategory').val().split('_')[0];
    op["cat_2_name"] = $('#add_SubCategory').find("option:selected").text();
    
    if(op["cat_2_id"] == undefined || op["cat_2_id"] == null || op["cat_2_id"] == '')
    {
        op["cat_2_id"]   = '';
        op["cat_2_name"] = '';
    }
    
    if($('#add_ThreeCategory').val()== undefined ||  $('#add_ThreeCategory').val()== null || $('#add_ThreeCategory').find("option:selected").text()== undefined ||  $('#add_ThreeCategory').find("option:selected").text()== null  || $('#add_ThreeCategory').find("option:selected").text()== '' )
    {
        op["cat_3_id"]   = "";
        op["cat_3_name"] = "";
    }
    else
    {
        op["cat_3_id"]   = $('#add_ThreeCategory').val();
        op["cat_3_name"] = $('#add_ThreeCategory').find("option:selected").text();

    }
    
    op["year"]  = $('#add_year').val();
    if(op["year"]  == undefined || op["year"]  == null || op["year"]  == '')
    {
        op["year"]  = '';
    }
    
    op["price"] = $('#add_price').val();
    if(op["price"]  == undefined || op["price"]  == null || op["price"]  == '')
    {
        op["price"]  = '';
    }
    
    op["make"]  = $('#add_Make').find("option:selected").text();
    op["model"] = $('#add_Model').find("option:selected").text()
    
    if(window.localStorage.getItem("user_Type") != 'Dealer')
    {
        op["type"]="private_used";
    }
    else
    {
        if($('#add_Type').val() != '' && $('#add_Type').val() != null)
        {
        if($('#add_Type').attr('name') != undefined && $('#add_Type').val() != '' && $('#add_Type').val() != null)
        {
            op["type"]=$('#add_Type').val();
        }
        else
        {
            
             op["type"]="dealer_used";
        }
        }
        else
        {
            navigator.notification.alert('Type on step1 of registration page is required',function(){},'TDA','OK');
            $('#add_Type').focus();
            return;

        }
        

    }
    
    if($('#add_Stock').attr('name') != undefined && $('#add_Stock').val() != '' && $('#add_Stock').val() != null)
    {
        op["reference_number"]=$('#add_Stock').val();
    }
    else
    {
        op["reference_number"]="";
       
    }
   
    op["custom_attributes"]=($('#form2').serializeObject());
//    op=JSON.stringify(op);
    console.log('OP op   '+op);
    
    navigateToStep3(op)
    
   
//    service.ajaxCall(op,function(result_data){
//                     
//                     console.log('result_data  \n'+JSON.stringify(result_data));
//                     
//                     },
//                     function(result_data){
//                     
//                     console.log('ERROR result_data  \n'+JSON.stringify(result_data));
//                     
//                     });
    

    
//    console.log('------- ------------  \n'+JSON.stringify($('#form2').serializeObject()));
    
    
   
    
    
    
//    else
//    {
//        alert('------- ------------  '+JSON.stringify($('#form2').serializeObject()));
//         console.log('------- ------------  '+JSON.stringify($('#form1').serializeObject()));
//        console.log('------- ------------  '+JSON.stringify($('#form2').serializeObject()));
//        return false;
//    }
   
}



var op_in;

var sliderimgarray_lngth;
var sliderimg_count = 0;

function navigateToStep3(op_inin)
{
    console.log(' hola \n op_in   ----  '+JSON.stringify(op_inin));
    op_in = op_inin;
      console.log(' \n op_in ----  '+op_in);
    $.mobile.changePage("#pageAddNewStep3", {transition:"none"})
//dataOnPageprwLst();
    
}



function dataOnPageprwLst()
{
     console.log(' DATA MY \n op_in ----  '+op_in);
            try
        {
            var telphno = 'tel:'+op_in.enquiry_phone;
            if(op_in.enquiry_phone == '' || op_in.enquiry_phone == null)
            {
                    telphno = 'N/A'
            }
            
            var add = window.localStorage.getItem('myAdd');
            
            $('#headlinecontainer').empty();
            $('#headlinecontainer').append('<h3 class="titile" id="topHeader_prevwlstPg" style="word-wrap: break-word;word-spacing: -2px;">'+op_in.headline+'</h3>');
            $('#imgSlideraa').empty();
            $('#remaingDetails_addedlidt').empty();
            $('#uppercollapsible_prvwlstPg').empty();
            $('#custom_attributes_prvwlstPg').empty();
            
            
            
            var typetoInsertng;
            
            if(window.localStorage.getItem("user_Type") != 'Dealer')
            {
                typetoInsertng = "private_used";
            }
            else
            {
                if($('#add_Type').attr('name') != undefined && $('#add_Type').val() != '' && $('#add_Type').val() != null)
                {
                    typetoInsertng=$('#add_Type').val();
                }
                else
                {
                    typetoInsertng = "Dealer";
                }
                
                
            }

            //alert(typetoInsertng)
            typetoInsertng = typetoInsertng.replace(/_/g, ' ');
            typetoInsertng = capitalize(typetoInsertng);
            
            var pricelocal = op_in.price;
            pricelocal=addCommas(pricelocal);
            
            if(pricelocal == 0 || pricelocal == '0' || pricelocal == '')
            {
                pricelocal='    -'
            }
            else
            {
                pricelocal=' $'+pricelocal;
            }
            
            if(imgearray.length>0)
            {
                    $("#imgSlideraa").empty();
                    static_logoDealer = ""
                    sliderimgarray_lngth = imgearray.length-1;
                  //  console.log(' sliderimgarray_lngth     '+ sliderimgarray_lngth+'     \n         slidrimg_array  '+imgearray);
                    
                    var div_imgcount="1 of "+(imgearray.length);
                
                    if(static_logoDealer != "")
                    {
                        $("#imgSlideraa").append('<div class="sliderimages" ><img src="'+imgearray[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                        sliderimg_count=1;
                    }
                    else
                    {
                        
                        $("#imgSlideraa").append('<div class="sliderimages" ><img src="'+imgearray[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                        sliderimg_count=1;
                    }
                
            }
            else
            {
                var div_imgcount="1 of 1";
                $("#imgSlideraa").append('<div class="sliderimages" ><img src="themes/images/demoImg.jpeg"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                sliderimg_count=1;
            }
            $("#imgSlideraa").trigger('create');
            
            $('#remaingDetails_addedlidt').append('<div class="top-leften"><span class="views prodenq"><a href="#">Enquiry</a></span><span class="views prodcall" id="callme_selectedtruck"><a href="'+telphno+'">Call</a></span><span class="views prorating-change" ></span></div><div class="mid"><ul><li class="dealername">'+typetoInsertng+'</li> <li class="dealeryear refbmk">REF: '+op_in.reference_number+'</li> <li class="dealerland refbmkamt delerref">'+pricelocal+'</li></ul></div><div class="addresspoints"><h3>'+add+'</h3> </div>')
            
            $('#remaingDetails_addedlidt').trigger('create');
            
           
            $('#uppercollapsible_prvwlstPg').append('<div data-role="collapsibleset" class="cset" data-theme="a" data-content-theme="a" data-iconpos="right"><div data-role="collapsible"> <h3>Description</h3> <div class="discrippragraph">'+op_in.description+'</div></div></div>');
             $( ".cset" ).collapsibleset();
            $( ".cset" ).collapsibleset("refresh");
            
           // $('#uppercollapsible_resultPg').trigger('create');
            
            
            
            $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Type  </span><span class="right">'+typetoInsertng+'</span></div>');
            $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Year  </span><span class="right">'+op_in.year+'</span></div>');
            $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Price  </span><span class="right">'+op_in.price+'</span></div>');
            $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Make  </span><span class="right">'+op_in.make+'</span></div>');
            $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Model  </span><span class="right">'+op_in.model+'</span></div>');
            $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Serial Number </span><span class="right">'+op_in.serial_number+'</span></div>');
            var stckloctn_full = changeStateName(op_in.stock_location);
            $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Stock Location  </span><span class="right">'+stckloctn_full+'</span></div>');
           
            $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Category  </span><span class="right">'+op_in.cat_1_name+'</span></div>');
            
         //   alert('dddddddddddddd');
            
            
            var alternate_var='even';
            if( !(op_in.cat_2_name == "" || op_in.cat_2_name == "Sub category" ))
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Sub Category </span><span class="right">'+op_in.cat_2_name+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Sub Category </span><span class="right">'+op_in.cat_2_name+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.odometer != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Odometer </span><span class="right">'+op_in.odometer+'</span></div>');
                   alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Odometer </span><span class="right">'+op_in.odometer+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.engine_capacity != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Engine Capacity </span><span class="right">'+op_in.engine_capacity+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Engine Capacity </span><span class="right">'+op_in.engine_capacity+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.engine_power != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Engine Power </span><span class="right">'+op_in.engine_power+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Engine Power </span><span class="right">'+op_in.engine_power+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.gcm != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Gcm </span><span class="right">'+op_in.gcm+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Gcm </span><span class="right">'+op_in.gcm+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.vin != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Vin </span><span class="right">'+op_in.vin+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Vin </span><span class="right">'+op_in.vin+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.fastrack_listing_id != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Fastrack Listing </span><span class="right">'+op_in.fastrack_listing_id+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Fastrack Listing </span><span class="right">'+op_in.fastrack_listing_id+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.inc_gst != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Gst </span><span class="right">'+op_in.inc_gst+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Gst </span><span class="right">'+op_in.inc_gst+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.industry != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Industry </span><span class="right">'+op_in.industry+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Industry </span><span class="right">'+op_in.industry+'</span></div>');
                    alternate_var='even';
                }
            }
            if(op_in.fastrack_type != "")
            {
                if(alternate_var == 'even' )
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view odd"><span class="left">Fastrack Type </span><span class="right">'+op_in.fastrack_type+'</span></div>');
                    alternate_var='odd';
                }
                else
                {
                    $('#custom_attributes_prvwlstPg').append('<div class="view even"><span class="left">Fastrack Type </span><span class="right">'+op_in.fastrack_type+'</span></div>');
                    alternate_var='even';
                }
            }
            $('#custom_attributes_prvwlstPg').trigger('create');
           // $('#middlecollapsible_prvwlstPg').append()
            $('#middlecollapsible_prvwlstPg').trigger('create');
            $('#further_detailslstprvw').empty();
            if(op_in.custom_attributes.length>0&&op_in.custom_attributes.length!=null&&op_in.custom_attributes.length!='')
            {
                $('#further_detailslstprvw').empty();
                for(var pj=0;pj<op_in.custom_attributes.length;pj++)
                {
                    if( alternate_var == 'even'){
                        $('#further_detailslstprvw').append('<div class="view odd"><span class="left">'+op_in.custom_attributes[pj].name+'</span><span class="right">'+op_in.custom_attributes[pj].value+'</span></div>');
                        alternate_var='odd';
                    }
                    else{
                        
                        $('#further_detailslstprvw').append('<div class="view even"> <span class="left">'+op_in.custom_attributes[pj].name+'</span><span class="right">'+op_in.custom_attributes[pj].value+'</span>');
                        alternate_var='even';
                    }
                }
            }
            $('#further_detailslstprvw').trigger('create');
            $('#lowercollapsible_prevwlst').trigger('create');
            $('#uppercollapsible_resultPg').trigger('create');
             stckloctn_full = '';
        $.mobile.changePage("#pageprevwListing", {transition:"none"})
            $('#hiddenImg').empty();
            for(var im=0;im<imgearray.length;im++){
                $('#hiddenImg').append('<img src="'+imgearray[im]+'" id="img_'+im+'" alt=""/>');
            }
            
        }
    catch(ex)
    {
        alert(ex)
    }
    
}



function convertToBase64(){
    
    var size= $('#hiddenImg').find('img').size();
    alert(size);
    $('#hiddenImg').find('img').each(function(){
                                     
                                     // Create an empty canvas element
                                     var canvas = document.createElement("canvas");
                                     canvas.width = this.width;
                                     canvas.height = this.height;
                                     // Copy the image contents to the canvas
                                     var ctx = canvas.getContext("2d");
                                     ctx.drawImage(this, 0, 0);
                                     var dataURL = canvas.toDataURL("image/png");
                                     console.log(dataURL.replace(/^data:image\/(png|jpg);base64,/, "")+"    Another");
                                     truckInfo.camera=dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                                     //  return;
                                     uploadImage();
                                     
                    })
    truckInfo.camera='';
    
}





/*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 
Image slider on preview page 
 Author: Ameeduddin
 
 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/
//var sliderimgarray_lngth;
//var sliderimg_count = 0;

$(document).ready(function()
{
     $(document).on('swipeleft','#imgSlideraa', function()
     {
                    
        if(imgearray.length > 1)
        {
            sliderimg_count++;
            if(sliderimg_count>(imgearray.length))
            {
               var div_imgcount="1 of "+imgearray.length;
                                 
               if(static_logoDealer == "")
               {
                  $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
              }
              else
              {
                  $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[0]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
              }
              sliderimg_count = 1;
             }
             else
             {
                  var div_imgcount=sliderimg_count+" of "+(imgearray.length);
                  if(static_logoDealer == "")
                  {
                        $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[sliderimg_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                  }
                  else
                  {
                       $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[sliderimg_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                  }
               }
           }
         });
                  
         $(document).on('swiperight','#imgSlideraa', function()
         {
            if(imgearray.length > 1)
            {
                sliderimg_count--;
                if(sliderimg_count<=0)
                {
                    var div_imgcount=imgearray.length+" of "+(imgearray.length);
                    if(static_logoDealer == "")
                    {
                         $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[imgearray.length-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                     }
                     else
                     {
                       $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[imgearray.length-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                     }
                     sliderimg_count = imgearray.length;
                }
                else
                {
                     var div_imgcount=sliderimg_count+" of "+(imgearray.length);
                     if(static_logoDealer == "")
                     {
                          $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[sliderimg_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div>');
                     }
                     else
                     {
                           $("#imgSlideraa").html('<div class="sliderimages"><img src="'+imgearray[sliderimg_count-1]+'"></div><div class="sliderpic"><span class="picimg"><img src="themes/images/smltruckimg.png"></span><span class="pictext">'+div_imgcount+'</span></div><div class="sliderlogo"><img src="'+static_logoDealer+'"></div>');
                     }
                 }
             }
           });
});

function addanewItem()
{
    if( $('#step2button').attr('step2selectn') =='Edit')
    {
        console.log("SEND JSON  ---- "+JSON.stringify(op_in))
        //alert('in progress............')
        
        op_in.action = "editListing"
        op_in.listID = window.localStorage.getItem("listId")
        
        
        console.log("JSON To be Sent : "+JSON.stringify(op_in))
        
        service.ajaxCall(JSON.stringify(op_in),function(result_data)
        {
            if( result_data.responseCode == 200)
            {
                console.log('result_data  \n'+JSON.stringify(result_data));
                navigator.notification.alert(result_data.responseMessage,function(){},'TDA','OK');

                $.mobile.changePage("#pageMyListing", {transition:"none"});
            }
            else
            {
                navigator.notification.alert('Cannot Edit Listing',function(){},'TDA','OK');
            }
                        
        },
        function(result_data)
        {
            console.log('ERROR result_data  \n'+JSON.stringify(result_data));
            navigator.notification.alert('Cannot connect to server',function(){},'TDA','OK');
                         
        });
        
    }
    
    
    else
    {
    console.log("SEND JSON  ---- "+JSON.stringify(op_in))
    
        service.ajaxCall(JSON.stringify(op_in),function(result_data)
                    {
                         if( result_data.responseCode == 200)
                         {
                             console.log('result_data  \n'+JSON.stringify(result_data));
                             window.localStorage.setItem("listId",result_data.listInfo.listID);
                            truckInfo.listId=result_data.listInfo.listID
                             truckInfo.heading = result_data.listInfo.headline
                             navigator.notification.alert(result_data.responseMessage,function(){},'TDA','OK');
                            if(window.localStorage.getItem("user_Type") != 'Dealer')
                            {
                                $.mobile.changePage("#pagePayment", {transition:"none"});
                            }
                            else
                            {
                                $.mobile.changePage("#pageMyListing", {transition:"none"});
//                                $(document).on("pageshow", "#pageMyListing", myListingData)
                            }
                              imgearray.length=0;
                         
                         }
                         else
                         {
                            navigator.notification.alert('Cannot save new listing',function(){},'TDA','OK');

                         }
    
                    },
                    function(result_data)
                    {
                          console.log('ERROR result_data  \n'+JSON.stringify(result_data));
                         navigator.notification.alert('Cannot connect to server',function(){},'TDA','OK');
    
                    });
    }
    
}




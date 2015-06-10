                                            //THIS FILE CONTAINS FUNCTIONALITIES OF SORTING ON THE TRUCK LISTING SCREEN
                                                                    //Author : Ameeduddin

/*---------------------------------------------------------------------------------------------------------
 Function to  display Step 1 screen of
 --------------------------------------------------------------------------------------------------------- */
function navTofrstpage_EDITlist(indata){
    only_lising  = indata;
    
    console.log('indata  edit '+JSON.stringify(indata));
    
    window.localStorage.setItem("listId",indata.truckData.truckID);
    truckInfo.listId=indata.truckData.truckID;
    console.log('window.localStorage.setItem("listId",  /n  t '+truckInfo.listId);
    imgearray.length=0;
    if(loginstatus==0)
    {
        $.mobile.changePage("#pageLogin", {transition:"none"})
    }
    else
    {
        console.log('TYPE click EDIT  listing '+user.Type);
        
        $('#add_Heading').val("");
        $('#add_Heading').val(indata.truckData.headline);
        
        $('#add_price').val("");
        if(indata.truckData.truckDetail.price==0)
        {
            $('#add_price').val("");
        }
        else
        {
            $('#add_price').val(indata.truckData.truckDetail.price);
        }
        
        $('#add_year').val("");
        if(indata.truckData.truckDetail.year==0)
        {
            $('#add_year').val("");
        }
        else
        {
            $('#add_year').val(indata.truckData.truckDetail.year);
        }
        
        $('#addStock').selectmenu();
        $("#addStock").val(indata.truckData.truckDetail.state);
        $('#addStock').selectmenu('refresh', true);
        
        $('#add_Model').selectmenu();
        $('#add_Make').selectmenu();
        
        
        if(indata.truckData.truckDetail.make=="")
        {
            $("#add_Make").val(indata.truckData.truckDetail.make);
            $("#add_Make").selectmenu('refresh', true);
        }
        else
        {
            $.each(makeArr,function(idx, obj)
                   {
                   if(indata.truckData.truckDetail.make==idx)
                   {
                     var makeval = obj;
                     $("#add_Make").val(makeval);
                     $("#add_Make").selectmenu('refresh', true);
                     var optionSelected = $("#add_Make").find("option:selected");
                     var textSelected   = optionSelected.text();
                     model_Value = true;
                     loadMODELS_VJ(textSelected);
                   }
                });
        }
        $('#add_Make').selectmenu('refresh', true);
       
        
        $('#add_Category').selectmenu();
//        $('#add_SubCategory').selectmenu();
        $("#add_Category").val(indata.truckData.truckDetail.cat_1_id);
        $("#add_Category").selectmenu('refresh', true);
        load_Subcatagory(indata.truckData.truckDetail.cat_1_id);
        cateValue = true;
        
        
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
            $('#add_Stock').val(indata.truckData.truckDetail.reference_number);
            
            $('#step1_type').append('<select  name="select-choice-1"  id="add_Type"><option disabled selected style="display:none;" value="null">Type</option><option value="dealer_new">Dealer New</option><option value="dealer_used">Dealer Used</option><option value="dealer_demo">Dealer Demo</option></select>');
            $("#add_Type").selectmenu();
            
            if(indata.truckData.truckDetail.type=="")
            {
                $("#add_Type").val("");
                $("#add_Type").selectmenu('refresh', true);
            }
            else if(indata.truckData.truckDetail.type=="Dealer Used" || indata.truckData.truckDetail.type=="dealer_used")
            {
                $("#add_Type").val("dealer_used");
                $("#add_Type").selectmenu('refresh', true);
            }
            else if(indata.truckData.truckDetail.type=="Dealer New" || indata.truckData.truckDetail.type=="dealer_new")
            {
                $("#add_Type").val("dealer_new");
                $("#add_Type").selectmenu('refresh', true);
            }
            else if(indata.truckData.truckDetail.type=="Dealer Demo" || indata.truckData.truckDetail.type=="dealer_demo")
            {
                $("#add_Type").val("dealer_demo");
                $("#add_Type").selectmenu('refresh', true);
            }
            else if(indata.truckData.truckDetail.type=="Private Used" || indata.truckData.truckDetail.type=="private_used")
            {
                $("#add_Type").val("private_used");
                $("#add_Type").selectmenu('refresh', true);
            }
            
            
            $('#gst_chckbox').append('<span class="left">Include GST:</span><span class="right" id="add_GST"><span class="top views-radios"><label><input name="radio-choice-0" id="radio-choice-0a" type="radio">Yes</label></span><span class="bottom views-radios"><label for="radio-choice-0b">No</label><input name="radio-choice-0" id="radio-choice-0b" class="custom" type="radio"></span></span>');
            $('#radio-choice-0a').checkboxradio();
            $('#radio-choice-0b').checkboxradio();
             //$.mobile.changePage("#pageAddNewStep1", {transition:"none"});
            if(indata.truckData.truckDetail.inc_gst=='1')
            {
                //alert('xyz: '+result_data.truckData.truckDetail.inc_gst)
                $('#radio-choice-0b').attr('checked',false).checkboxradio('refresh');
                $('#radio-choice-0a').attr('checked',true).checkboxradio('refresh');
                $('#radioBox').trigger('create');
            }
            else if(indata.truckData.truckDetail.inc_gst=='0')
            {
                //alert('abc: '+result_data.truckData.truckDetail.inc_gst)
                $('#radio-choice-0a').attr('checked',false).checkboxradio('refresh');
                $('#radio-choice-0b').attr('checked',true).checkboxradio('refresh');
                $('#radioBox').trigger('create');
            }
            else
            {
                //alert('pqr: '+result_data.truckData.truckDetail.inc_gst)
                $('#radio-choice-0a').attr('checked',false).checkboxradio('refresh');
                $('#radio-choice-0b').attr('checked',false).checkboxradio('refresh');
                $('#radioBox').trigger('create');
            }
            
            $('#cntainer_addStock').trigger('create');
            $('#step1_type').trigger('create');
            $('#gst_chckbox').trigger('create');
            
        }

        for(var k=0;k<indata.truckData.image.length;k++)
        {
            var imgurl='https://truckdealersaustralia.com.au/uploads/listings/'+indata.truckData.truckID+'/'+indata.truckData.image[k].fileUrl;
            console.log('imgurl:  '+imgurl);
            imgearray.push(imgurl);
            
        }
        
        $('#step2button').attr('step2selectn','Edit');
       $.mobile.changePage("#pageAddNewStep1", {transition:"none"});
    }

}
function plcedataEditlist()
{
//    alert($('#step2button').attr('step2selectn'))
    $('#add_description').val('');
    
   $('#add_description').val(mylistdata.truckData.description);
   if(window.localStorage.getItem("user_Type") != 'Dealer')
   {
        $('#add_enqPhone').val(mylistdata.truckData.truckDetail.enquiry_phone);
   }
   else
   {
       $('#add_enqPhone').val(mylistdata.truckData.dealership_phone);
   }
   if($('#odometer').attr('name') != undefined)
   {
        $('#odometer').val(mylistdata.truckData.truckDetail.odometer);
   }
   if($('#vin').attr('name') != undefined)
   {
       $('#vin').val(mylistdata.truckData.truckDetail.vin);
   }
   if($('#gcm').attr('name') != undefined )
   {
      $('#gcm').val(mylistdata.truckData.truckDetail.gcm);
   }
   if($('#hours').attr('name') != undefined )
   {
      $('#hours').val(mylistdata.truckData.truckDetail.hours);
   }
   if($('#engine_power').attr('name') != undefined)
   {
       $('#engine_power').val(mylistdata.truckData.truckDetail.engine_power);
   }
   if($('#engine_capacity').attr('name') != undefined)
   {
      $('#engine_capacity').val(mylistdata.truckData.truckDetail.engine_capacity);
   }
   console.log('HTML OF CREATED ELEMNTS  \n  \n  '+$('#form2').html())
   if(mylistdata.truckData.furtherDetail.length > 0 )
   {
       try{
       for(var l=0;l<mylistdata.truckData.furtherDetail.length-1;l++)
       {
           console.log('HOAL  '+mylistdata.truckData.furtherDetail[l].name.replace(/\s+/g, '_'));
          
           if( mylistdata.truckData.furtherDetail[l].name.search("/") <0)
           {
               var class_id="."+mylistdata.truckData.furtherDetail[l].name;
                console.log('BEFORE   class_id  \n'+class_id)
               if( class_id.search(" ") >-1)
               {
                   class_id = class_id.replace(/\s+/g, '_')
                   console.log("id = id.replac  \n"+class_id);
               }
               console.log('CREATED ID --\n\n   + '+class_id)
               if($(class_id).attr('name') != undefined)
               {                   
                   $(class_id).val(mylistdata.truckData.furtherDetail[l].value);
                   console.log('----------html------------\n   '+$(class_id).html());
                   
                   
                   
               }
           }
        }
       }
       catch(ex)
       {
           alert(ex);
       }
   }
   console.log('EDIT ITEM DATA   '+JSON.stringify(mylistdata));
    
}
var mylistdata;
function editCurrentList(listId)
{
    var truckid = $(listId).attr('id').split('_')[1]
    truckInfo.listId = truckid;

    var editlist_Json=
    {
        "action":"favouriteDetail",
        "truckID":truckid,
        "userID":user.Id
    };
    
    editlist_Json = JSON.stringify(editlist_Json);
    console.log('editlist_Json     '+editlist_Json);
    
    service.ajaxCall(editlist_Json,function(result_data)
                     {
                        console.log('DATA RESULT   '+result_data);
                        if(result_data.responseCode==200)
                        {
                            mylistdata = result_data;
                            navTofrstpage_EDITlist(result_data);
                        }
                        else
                        {
                            navigator.notification.alert('Truck Information not available', function(){},'Truck Sales','OK');
                            return;
                        }
                     },
                     function(result_data)
                     {
                        navigator.notification.alert('Cannot connect to the server', function(){},'Truck Sales','OK');
                        console.log('failure '+JSON.stringify(result_data));
                        return;
                     });
    
}
var typeValue = false;
var makeValue = false;
var stockValue = false;
var cateValue = false;
var only_lising = "";
var sub_cateValue = false;
var model_Value = false;

//$(document).on("pageshow","#pageAddNewStep1", function()
//{
//    if(!(typeValue))
//    {
//        var typeData=
//        {
//               "action": "getType",
//        }
//        console.log(JSON.stringify(typeData));
//        typeData = JSON.stringify(typeData);
//        service.ajaxCall(typeData,
//            function(result_data)                                 // Success Callback function
//            {
//                if(result_data.responseCode==200)
//                {
//                    
//                    $('#add_Type').empty();
//                    $('#add_Type').append('<option value="">Type</option>');
//                    $.each(result_data.category, function(idx, obj)
//                    {
//                        $('#add_Type').append('<option value="'+idx+'">'+obj+'</option>');
//                    });
//                    typeValue=true;
//                    console.log('vishal     '+JSON.stringify(result_data));
//                }
//                else if(result_data.responseCode==0)
//                {
//                    console.log(JSON.stringify(result_data));
//                }
//            },
//            function(result_data)                                 // Error Callback function
//            {
//                console.log(JSON.stringify(result_data));
//            });
//    }
//               
//    if(!(makeValue))
//    {
//        var getmake_Json={"action":"getMake"};
//        getmake_Json=JSON.stringify(getmake_Json);
//        console.log('getmake_Json -- '+getmake_Json);
//        service.ajaxCall(getmake_Json,function(result_data){
//                        if(result_data.responseCode == 200 || result_data.responseMessage == 'Makes Fetched successfully.')
//                        {
//                            $('#add_Make').empty();
//                            $('#add_Make').append('<option value="">Make</option>');
//                            for(var i=0;i<result_data.Makes.length;i++)
//                            {
//                                $('#add_Make').append('<option value="'+result_data.Makes[i].id+'">'+result_data.Makes[i].name+'</option>');
//                            }
//                            makeValue=true;
//                        }
//                        else
//                        {
//                            $('#add_Make').empty();
//                            $('#add_Make').append('<option value="">Select a make</option>');
//                        }
//                        $('#add_Make').selectmenu('refresh');
//                    },
//                    function(result_data)
//                    {
//                         navigator.notification.alert(result_data.responseMessage, function(){},'TDA','OK');
//                    });
//    }
    /*if(!(stockValue))
    {
        var stateData=
        {
               "action":"getState",
        }
        console.log(JSON.stringify(stateData));
        stateData = JSON.stringify(stateData);
        service.ajaxCall(stateData,
                function(result_data)                                 // Success Callback function
                {
                         try{
                         if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                         {
                            $('#addStock').empty();
                            $('#addStock').append('<option disabled selected style="display:none;" value="">Stock location</option>');
                            $.each(result_data.States, function(idx, obj)
                            {
                                $('#addStock').append('<option value="'+idx+'">'+obj+'</option>');
                            });
                            stockValue=true;
                         }
                         $('#addStock').selectmenu('refresh');
                         }
                         catch(ex)
                         {
                            // alert('catch states'+JSON.stringify(ex));
                         }
                },
                function(result_data)                                 // Error Callback function
                {
                    //alert(JSON.stringify(result_data));
                    console.log(JSON.stringify(result_data));
                });
    }*/
//    if(!(cateValue))
//    {
//        var getcatg1_Json={"action":"getCategory"};
//        getcatg1_Json=JSON.stringify(getcatg1_Json);
//        console.log('getcatg1_Json -- '+getcatg1_Json);
//        service.ajaxCall(getcatg1_Json,function(result_data){
//                    try
//                    {
//                        if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
//                        {
//                            $('#add_Category').empty();
//                            $('#add_Category').append('<option disabled selected style="display:none;" value="-5">Category</option>');
//                            $.each(result_data.category, function(idx, obj)
//                            {
//                                $('#add_Category').append('<option value="'+idx+'">'+obj+'</option>');
//                            });
//                            cateValue=true;
//                        }
//                        $('#add_Category').selectmenu('refresh');
//                         //alert('hiiihello')
//                    }
//                    catch(ex)
//                    {
//                        alert('catch '+JSON.stringify(ex));
//                    }
//                },
//                function(result_data)
//                {
//                    //    navigator.notification.alert(result_data.responseMessage, function(){},'Truck Sales','OK');
//                });
//    }
//             
//});



var modelArr = {};

function loadMODELS_VJ(textSelected)
{
    //alert('MODELS')
    var getmodels_Json={"action":"getModel",
        "make":textSelected
    };
    getmodels_Json=JSON.stringify(getmodels_Json);
    console.log('getmodels_Json -- '+getmodels_Json);
    service.ajaxCall(getmodels_Json,function(result_data){
            try
            {
                if(result_data.responseCode == 200 || result_data.responseMessage == 'Model Fetched successfully.')
                {
                    $('#add_Model').empty();
                    $('#add_Model').append('<option disabled selected style="display:none;" value="">Model</option>');
                    //                            $('#searchBoxModel_AU').append('<option>All models</option>');
                    for(var i=0;i<result_data.category.length;i++)
                    {
                        var key=result_data.category[i].name+"";
                        modelArr[key]=result_data.category[i].id;
                     
                        $('#add_Model').append('<option value="'+result_data.category[i].id+'">'+result_data.category[i].name+'</option>');
                    }
                     console.log('model array: '+JSON.stringify(modelArr));
                     
                }
                else
                {
                    $('#add_Model').empty();
                    $('#add_Model').append('<option disabled selected style="display:none;" value="">Model</option>');
                    //                            $('#searchBoxModel_AU').append('<option selected="selected">All makes</option>');
                }
                $('#add_Model').selectmenu('refresh');
                if(model_Value)
                {
                    set_model();
                }
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

function load_Subcatagory(textSelected)
{
    var getcatg2_Json={"action":"subCategory",
        "parent": textSelected
    };
    getcatg2_Json=JSON.stringify(getcatg2_Json);
    console.log('getcatg2_Json -- '+getcatg2_Json);
    
    //Backend API invocation to retreive catagory 2
    service.ajaxCall(getcatg2_Json,function(result_data){
            try
            {
                if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
                {
                    $('#add_SubCategory').empty();
                    $('#add_SubCategory').append('<option value="0_0">Sub category</option>');
                    //alert('load '+ $('#add_SubCategory').val())
                    for(var i=0;i<result_data.category.length;i++)
                    {
                        var tst_var=true;
                        $.each(result_data.category[i],function(idx,val)
                        {
                            if(tst_var == true)
                            {
                               var val_Option =idx+'_'+result_data.category[i].hasSubcategory;
                               $('#add_SubCategory').append('<option value="'+val_Option+'">'+val+'</option>');
                               tst_var = false;
                            }
                        });
                    }
                    //alert('hiii')
                    $('#add_SubCategory').val('0_0');
                    $('#add_SubCategory').selectmenu('refresh')
                    if(cateValue)
                    {
                        addsubcate();
                    }
                }
                else
                {
                    $('#add_SubCategory').empty();
                    $('#add_SubCategory').append('<option disabled selected style="display:none;" value="">Sub category</option>');
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

function load_AdditionalCatagory(textSelected)
{
    //alert(textSelected)
    var getcatg2_Json={"action":"subCategory",
        "parent":textSelected
    };
    getcatg2_Json=JSON.stringify(getcatg2_Json);
    console.log('SUB CATAGORY #getcatg2_Json -- '+getcatg2_Json);
    //Backend API invocation to retreive catagory 3
    service.ajaxCall(getcatg2_Json,function(result_data){
        try{
            if(result_data.responseCode == 200 || result_data.responseMessage == 'category Fetched successfully.')
            {
                $('#add_ThreeCategory').empty();
                $('#add_ThreeCategory').append('<option disabled selected style="display:none;" value="-1">Additional Category</option>');
                
                for(var i=0;i<result_data.category.length;i++)
                {
                    var tst_var=true;
                    $.each(result_data.category[i],function(idx,val)
                    {
                        if(tst_var == true)
                        {
                            $('#add_ThreeCategory').append('<option value="'+idx+'">'+val+'</option>');
                            //alert(idx+' --- '+val +'hfjhdsjg '+result_data.category[i].hasSubcategory+' ?? '+ idx);
                            tst_var = false;
                        }
                    });
                }
                $('#add_ThreeCategory').val('-1');
                $('#add_ThreeCategory').selectmenu('refresh')
                if(sub_cateValue)
                {
                    additional_subcate();
                }
                
            }
            else
            {
                $('#add_ThreeCategory').empty();
                $('#add_ThreeCategory').append('<option disabled selected style="display:none;">Additional Category</option>');
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


///////////////////////////////////////////////////////// Change event in select boxs /////////////////////////////////////////////////////////

$(document).on('change','#add_Make',function()
{
    model_Value = false;
    var optionSelected = $(this).find("option:selected");
    var textSelected   = optionSelected.text();
    //alert(' textSelected '+textSelected)
    if(textSelected == 'Make')
    {
        $('#add_Model').empty();
        $('#add_Model').append('<option disabled selected style="display:none;"  value="">Model</option>');
    }
    else
    {
        loadMODELS_VJ(textSelected);
    }
});

$(document).on('change','#add_Category',function()
{
    cateValue = false;
    var optionSelected = $(this).find("option:selected");
    var textSelected   = optionSelected.text();
    var valSel = 0;
    valSel = optionSelected.val();
    
//alert(' textSelected '+textSelected)
    if(textSelected == 'Category')
    {
        $('#add_SubCategory').empty();
        $('#add_SubCategory').append('<option disabled selected style="display:none;" value="">Sub category</option>');
    }
    else
    {
        load_Subcatagory(valSel);
    }
});

$(document).on('change','#add_SubCategory',function()
{
    sub_cateValue = false;
    var optionSelected = $(this).find("option:selected");
    var textSelected   = optionSelected.text();
    var valueSelected   = optionSelected.val();
    if(textSelected == 'Sub category' || valueSelected.split('_')[1] == 0)
    {
        $('#add_CategoryContainer').empty()
    }
    else
    {
        $('#add_CategoryContainer').append('<select id="add_ThreeCategory"><option disabled selected style="display:none;">Additional Category</option></select>');
        $('#add_CategoryContainer').trigger('create');
        load_AdditionalCatagory(valueSelected.split('_')[0]);
    }
});

////////////////////////////////////////////////////////////

function addStep2()
{
    truckInfo.heading = validate.blankValidation({id:add_Heading,text:"heading."});
	if(truckInfo.heading!=true)
    {
		navigator.notification.alert(truckInfo.heading,notifySuccess,'TDA','OK');
        return;
	}
    
    truckInfo.catagory = validate.blankSelectValidation({id:add_Category,text:"category."});
	if(truckInfo.catagory!=true)
    {
		navigator.notification.alert(truckInfo.catagory,notifySuccess,'TDA','OK');
        return;
	}
    ///// year
    var year = document.getElementById('add_year').value;
    var price = document.getElementById('add_price').value;
    var regexNum = /^[0-9\b]+$/;
    year = year.trim();
    price = price.trim();
    if(year.length!=0)
    {
        if(!regexNum.test(year))
        {
            navigator.notification.alert('Please enter a number in year.',notifySuccess,'TDA','OK');
            document.getElementById('add_year').focus();
            return;
        }
    }
    if(price.length!=0)
    {
        if(!regexNum.test(price))
        {
            navigator.notification.alert('Please enter a number in price.',notifySuccess,'TDA','OK');
            document.getElementById('add_price').focus();
            return;
        }
    }
        
        
        
    if(document.getElementById('radio-choice-0a').checked)
    {
        truckInfo.gst=1;
    }
    else if(document.getElementById('radio-choice-0b').checked)
    {
        truckInfo.gst=0;
    }
    
    if(truckInfo.heading==true && truckInfo.catagory==true)
    {
        $.mobile.changePage("#pageAddNewStep2", {transition:"none"})
    }
}
function addStep3()
{
    truckInfo.heading = $('#add_Heading').val();
    truckInfo.stockRef = $('#add_Stock').val();
    //var typeSelected = $('#add_Type').find("option:selected");
    //truckInfo.type = typeSelected.text();
    truckInfo.type = $('#add_Type').val();
    var makeSelected = $('#add_Make').find("option:selected");
    truckInfo.make = makeSelected.text();
    var modelSelected = $('#add_Model').find("option:selected");
    truckInfo.model = modelSelected.text();
    truckInfo.stockLocation = $('#addStock').val();
    var categorySelected = $('#add_Category').find("option:selected");
    truckInfo.catagory = categorySelected.text();
    truckInfo.catagoryId = $('#add_Category').val();
    var subcategorySelected = $('#add_SubCategory').find("option:selected");
    truckInfo.subCatagory = subcategorySelected.text();
    truckInfo.subCatagoryId = $('#add_SubCategory').val();
    truckInfo.year = $('#add_year').val();
    truckInfo.price = $('#add_price').val();
    truckInfo.enqPhone = $('#add_enqPhone').val();
    truckInfo.gvm = $('#add_Gvm').val();
    truckInfo.trans = $('#add_Transmission').val();
    truckInfo.diffs = $('#add_Diffs').val();
    truckInfo.diff_Ratio = $('#add_Diff_Ratio').val();
    truckInfo.suspension = $('#add_Suspen').val();
    truckInfo.fuel_Type = $('#add_Fuel_Type').val();
    truckInfo.Fuel_Capacity = $('#add_Fuel_Capacity').val();
    truckInfo.brakes = $('#add_Brakes').val();
    truckInfo.color = $('#add_color').val();
    truckInfo.description = $('#add_description').val();
    var addcategorySelected = $('#add_ThreeCategory').find("option:selected");
    truckInfo.addCatagory = addcategorySelected.text();
    truckInfo.addCatagoryId = $('#add_ThreeCategory').val();
    truckInfo.axel_config = $('#axel_Config').val();
    truckInfo.difft_locks = $('#diff_locks').val();
    //alert(truckInfo.difft_locks)
    
    var addListing_Data=
    {
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType": device.Type,
        "headline": truckInfo.heading,
        "reference_number": truckInfo.stockRef,
        "type": truckInfo.type,
        "stock_location": truckInfo.stockLocation,
        "category_id": truckInfo.catagoryId,
        "category": truckInfo.catagory,
        "sub_category_id": truckInfo.subCatagoryId,
        "sub_category": truckInfo.subCatagory,
        "additional_category_id": truckInfo.addCatagoryId,
        "additional_category": truckInfo.addCatagory,
        "year": truckInfo.year,
        "price": truckInfo.price,
        "enquiry_phone": truckInfo.enqPhone,
        "make": truckInfo.make,
        "model": truckInfo.model,
        "description": truckInfo.description,
        "inc_gst": truckInfo.gst,
        "gvm": truckInfo.gvm,
        "transmission": truckInfo.trans,
        "diffs": truckInfo.diffs,
        "diff_ratio": truckInfo.diff_Ratio,
        "suspension": truckInfo.suspension,
        "fuel_type": truckInfo.fuel_Type,
        "fuel_capacity": truckInfo.Fuel_Capacity,
        "brakes": truckInfo.brakes,
        "colour": truckInfo.color,
        "axel_configuration": truckInfo.axel_config,
        "diff_locks": truckInfo.difft_locks,
    }
    if(addListing_Data.additional_category_id== undefined || addListing_Data.additional_category_id== null)
    {
        addListing_Data.additional_category_id="";
    }
    if(addListing_Data.sub_category_id== undefined || addListing_Data.sub_category_id== null)
    {
        addListing_Data.sub_category_id="";
    }
    if(addListing_Data.sub_category =="Sub category")
    {
        addListing_Data.sub_category="";
    }
    if(addListing_Data.stock_location== undefined || addListing_Data.stock_location== null)
    {
        addListing_Data.stock_location="";
    }
    if(addListing_Data.type=="Type")
    {
        addListing_Data.type="";
    }
    if(addListing_Data.make=="Make")
    {
        addListing_Data.make="";
    }
    if(addListing_Data.model=="Model")
    {
        addListing_Data.model="";
    }
    if(addListing_Data.sub_category_id=="0_0")
    {
        addListing_Data.sub_category_id="";
    }
    //addListing_Data.axel_configuration="";
    //addListing_Data.diff_locks="";

    console.log('---------vishal -----------'+JSON.stringify(addListing_Data));

    
    if(truckInfo.detailsAddListing==0)
    {   //alert('add')
        addListing_Data.action="addListing";
        addListing_Data = JSON.stringify(addListing_Data);
        service.ajaxCall(addListing_Data,
            function(result_data)
            {
                if(result_data.responseCode==200)
                {
                    truckInfo.listId=result_data.listInfo.listID;
                    window.localStorage.setItem("listId",result_data.listInfo.listID);
                    $.mobile.changePage("#pageAddNewStep3", {transition:"none"})
                    console.log(JSON.stringify(result_data));
                    //navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                }
                else if(result_data.responseCode==0)
                {
                    console.log(JSON.stringify(result_data));
                    navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                }
            },
            function(result_data)
            {
                //alert(JSON.stringify(result_data));
                console.log(JSON.stringify(result_data));
            });
    }
    else
    {   //alert('edit')
        addListing_Data.listID=truckInfo.listId;
        console.log('editData: '+JSON.stringify(addListing_Data))
        $.ajax({
               type: "POST",
               url:'https://truckdealersaustralia.com.au/mobile/webservices/editListing.php',
               contentType: "application/json",
               dataType: "json",
               data:JSON.stringify(addListing_Data),
               beforeSend:function()
               {
                    spinnerplugin.show();
               },
               complete:function()
               {
                    spinnerplugin.hide();
               },
               success: function(result_data,status,jqXHR)
               {
                    if(result_data.responseCode==200)
                    {
                        truckInfo.listId=result_data.listInfo.listID;
                        window.localStorage.setItem("listId",result_data.listInfo.listID);
                        $.mobile.changePage("#pageAddNewStep3", {transition:"none"})
                        console.log(result_data);
                        //navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                    }
                    else if(result_data.responseCode==0)
                    {
                        console.log(result_data);
                        spinnerplugin.hide();
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                    }
               },
               error: function(jqXHR, textStatus, errorThrown)
               {
                    spinnerplugin.hide();
                    console.log('err' +JSON.stringify(jqXHR));
               }
        });
    }
}


///////////////////////////////////////// Image Capturing //////////////////////////////////

function truckImages()
{
    $(".picup").popup("open");
}

//////////////// Popup close ////////////////////
$(document).on("click","#canpic", function()
{
    $(".picup").popup("close");
});

/////////////////// Camera functionality //////////////////
$(document).on("click","#campic", function()
{
    $('#myImage').attr('src','');
               //$('#myImage').removeAttr('src')
    $('#smallImage').attr('src','');
    $('#myImage').trigger('create');
    $('#smallImage').trigger('create');
               
    $(".picup").popup("close");
    navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 50,correctOrientation: true,
         destinationType:Camera.DestinationType.DATA_URL
    });

});

function cameraSuccess(imageuri)
{
    //console.log('image code'+imageuri);
    truckInfo.camera = imageuri;
    var cameraimage = document.getElementById('myImage');
    cameraimage.src = "data:image/jpeg;base64," + imageuri;
    var smallImage= document.getElementById('smallImage');
    smallImage.src = "data:image/jpeg;base64," + imageuri;
}
    
function cameraError(message) {
    console.log('Failed because: ' + message);
}

/////////////////////// Gallery functionality ////////////////////////
$(document).on("click","#gallery", function()
{
    $(".picup").popup("close");
    $('#myImage').attr('src','');
    $('#smallImage').attr('src','');
    navigator.camera.getPicture(cameraSuccess, cameraError, { quality: 40,
            destinationType: Camera.DestinationType.DATA_URL,sourceType : Camera.PictureSourceType.PHOTOLIBRARY
    });
});

///////////////////////////// image upload functionality integration ////////////////////////////////
function uploadImage()
{
    var imageUpload_Data =
    {
        "action": "uploadImage",
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType": device.Type,
        "listID": truckInfo.listId,
        "listImage": truckInfo.camera,
    };
    
    //console.log(JSON.stringify(imageUpload_Data));
    imageUpload_Data = JSON.stringify(imageUpload_Data);
    
    service.ajaxCall(imageUpload_Data,
                     function(result_data)
                     {
                     if(result_data.responseCode==200)
                     {
                        $('#skip').empty();
                        $('#skip').append('Next');
                        console.log(JSON.stringify(result_data));
                        $('#myImage').attr('src','');
                        $('#smallImage').attr('src','');
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                        
                     }
                     else if(result_data.responseCode==0)
                     {
                        console.log(JSON.stringify(result_data));
                        navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                     }
                     
                     },
                     function(result_data)
                     {
                        console.log(JSON.stringify(result_data));
                     });
}


/*************************************************************************************************************************************
 Author: Vishal Jain.
 Purpose: Auto description using genrate description webservices.
 **************************************************************************************************************************************/

function autoDescription()
{
    truckInfo.type = $('#add_Type').val()
    truckInfo.heading = $('#add_Heading').val();
    truckInfo.year = $('#add_year').val();
    truckInfo.price = $('#add_price').val();
    truckInfo.enqPhone = $('#add_enqPhone').val();
    var makeSelected = $('#add_Make').find("option:selected");
    truckInfo.make = makeSelected.text();
    var modelSelected = $('#add_Model').find("option:selected");
    truckInfo.model = modelSelected.text();

    if(document.getElementById('radio-choice-0a').checked)
    {
        truckInfo.gst=1;
    }
    else if(document.getElementById('radio-choice-0b').checked)
    {
        truckInfo.gst=0;
    }
    if(truckInfo.make=="Make")
    {
        truckInfo.make="";
    }
    if(truckInfo.model=="Model")
    {
        truckInfo.model="";
    }
    
    var genDesript_Data =
    {
        "action":"generateDescription",
        "userID": user.Id,
        "deviceID": device.Id,
        "deviceType": device.Type,
        "listingType": truckInfo.type,
        "headline": truckInfo.heading,
        "type": truckInfo.type,
        "year": truckInfo.year,
        "price": truckInfo.price,
        "enquiry_phone": truckInfo.enqPhone,
        "make": truckInfo.make,
        "model": truckInfo.model,
        "inc_gst": truckInfo.gst,
        "odometer": "",
        "hours": "",
        "engine_capacity": "",
        "engine_power": ""
    }
    console.log(JSON.stringify(genDesript_Data));
    genDesript_Data = JSON.stringify(genDesript_Data);
    
    service.ajaxCall(genDesript_Data,
            function(result_data)
            {
                if(result_data.responseCode==200)
                {
                    $('#add_description').empty();
                    $('#add_description').val(result_data.description);
                    console.log(JSON.stringify(result_data));
                    //navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                    
                }
                else if(result_data.responseCode==0)
                {
                    console.log(JSON.stringify(result_data));
                    navigator.notification.alert(result_data.responseMessage,notifySuccess,'TDA','OK');
                }
                    
            },
            function(result_data)
            {
                console.log(JSON.stringify(result_data));
            });
}

/*************************************************************************************************************************************
Author: Vishal Jain.
Purpose: Edit listing using editlisting webservices.
**************************************************************************************************************************************/

function editList(listId)
{
    $('body').find('.addNew').each(function()
    {
        $(this).html('EDIT LISTING');
    });
    if(truckInfo.dropdown_Check==1)
    {
        $('#add_Type').val("");
        $('#add_Type').selectmenu('refresh', true);
        $('#add_Make').val("");
        $('#add_Make').selectmenu('refresh', true);
        $('#add_Model').val("");
        $('#add_Model').selectmenu('refresh', true);
        $('#add_Category').val("");
        $('#add_Category').selectmenu('refresh', true);
        $('#add_SubCategory').val("");
        $('#add_SubCategory').selectmenu('refresh', true);
        $('#axel_Config').val("");
        $('#axel_Config').selectmenu('refresh', true);
        $('#diff_Locks').val("");
        $('#diff_Locks').selectmenu('refresh', true);
        $('#add_CategoryContainer').empty();
    }
    truckInfo.dropdown_Check="1";
    $('#add_Heading').val("");
    $('#add_Stock').val("");
    $('#add_year').val("");
    $('#add_price').val("");
    $('#add_enqPhone').val("");
    $('#add_Gvm').val("");
    $('#add_Transmission').val("");
    $('#add_Diffs').val("");
    $('#add_Diff_Ratio').val("");
    $('#add_Suspen').val("");
    $('#add_Fuel_Type').val("");
    $('#add_Fuel_Capacity').val("");
    $('#add_Brakes').val("");
    $('#add_color').val("");
    $('#add_description').val("");
    $('#add_ThreeCategory').val("");
    
    truckInfo.detailsAddListing = 1;
    
    $.mobile.changePage("#pageAddNewStep1", {transition:"none"});
    var truckid = $(listId).attr('id').split('_')[1]
    truckInfo.listId = truckid;
    var gettrckdetails_Json=
    {
        "action":"favouriteDetail",
        "truckID":truckid,
        "userID":user.Id
    };
    gettrckdetails_Json=JSON.stringify(gettrckdetails_Json);
    
    console.log(gettrckdetails_Json+'    gettrckdetails_Json')
    
    service.ajaxCall(gettrckdetails_Json,function(result_data)
        {
            if(result_data.responseCode==200)
            {
                     only_lising = result_data;
                     console.log('sucsEdit '+JSON.stringify(result_data));
                     truckInfo.payment_status = result_data.truckData.truckDetail.paymentStatus
                     $('#add_Heading').val(result_data.truckData.headline);
                     $('#add_Stock').val(result_data.truckData.truckDetail.reference_number);
                     $('#add_description').val(result_data.truckData.description);
                     if(result_data.truckData.truckDetail.price==0)
                     {
                        $('#add_price').val("");
                     }
                     else
                     {
                        $('#add_price').val(result_data.truckData.truckDetail.price);
                     }
                     if(result_data.truckData.truckDetail.year==0)
                     {
                        $('#add_year').val("");
                     }
                     else
                     {
                        $('#add_year').val(result_data.truckData.truckDetail.year);
                     }
                     $('#add_enqPhone').val(result_data.truckData.truckDetail.enquiry_phone);
                     
                     // For gst value implement.
                     if(result_data.truckData.truckDetail.inc_gst=='1')
                     {
                        //alert('xyz: '+result_data.truckData.truckDetail.inc_gst)
                        $('#radio-choice-0a').attr('checked',true).checkboxradio('refresh');
                     }
                     else if(result_data.truckData.truckDetail.inc_gst=='0')
                     {
                        //alert('abc: '+result_data.truckData.truckDetail.inc_gst)
                        $('#radio-choice-0b').attr('checked',true).checkboxradio('refresh');
                     }
                     else
                     {
                        //alert('pqr: '+result_data.truckData.truckDetail.inc_gst)
                        $('#radio-choice-0a').attr('checked',false).checkboxradio('refresh');
                        $('#radio-choice-0b').attr('checked',false).checkboxradio('refresh');
                     }
                     $('#add_Gvm').val("");
                     $('#add_Transmission').val("");
                     $('#add_Diffs').val("");
                     $('#add_Diff_Ratio').val("");
                     $('#add_Suspen').val("");
                     $('#add_Fuel_Type').val("");
                     $('#add_Fuel_Capacity').val("");
                     $('#add_Brakes').val("");
                     $('#add_color').val("");
                     
                     // For state implement.
                     $("#addStock").val(result_data.truckData.truckDetail.state);
                     $("#addStock").selectmenu('refresh', true);

                     
                     //alert(result_data.truckData.furtherDetail.length)
                     if(result_data.truckData.furtherDetail.length!=0)
                     {
                        for(i=0;i<result_data.truckData.furtherDetail.length;i++)
                        {
                            if(result_data.truckData.furtherDetail[i].name=="gvm")
                            {
                                $('#add_Gvm').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="transmission")
                            {
                                $('#add_Transmission').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="diffs")
                            {
                                $('#add_Diffs').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="diff_ratio")
                            {
                                $('#add_Diff_Ratio').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="suspension")
                            {
                                $('#add_Suspen').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="fuel_type")
                            {
                                $('#add_Fuel_Type').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="fuel_capacity")
                            {
                                $('#add_Fuel_Capacity').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="brakes")
                            {
                                $('#add_Brakes').val(result_data.truckData.furtherDetail[i].value);
                            }
                            else if(result_data.truckData.furtherDetail[i].name=="colour")
                            {
                                $('#add_color').val(result_data.truckData.furtherDetail[i].value);
                            }
                     
                            else if(result_data.truckData.furtherDetail[i].name=="axel_configuration")
                            {
                                $('#axel_Config').val(result_data.truckData.furtherDetail[i].value);
                            }
//                            else if(result_data.truckData.furtherDetail[i].name=="colour")
//                            {
//                                $('#diff_Locks').val(result_data.truckData.furtherDetail[i].value);
//                            }
                        }
                     }
                     if(result_data.truckData.truckDetail.make=="")
                     {
                        $("#add_Make").val(result_data.truckData.truckDetail.make);
                        $("#add_Make").selectmenu('refresh', true);
                     }
                     else
                     {
                        $.each(makeArr,function(idx, obj)
                        {
                            if(result_data.truckData.truckDetail.make==idx)
                            {
                                var makeval = obj;
                                //alert(makeval);
                                $("#add_Make").val(makeval);
                                $("#add_Make").selectmenu('refresh', true);
                                var optionSelected = $("#add_Make").find("option:selected");
                                var textSelected   = optionSelected.text();
                                model_Value = true;
                                loadMODELS_VJ(textSelected);
                               
                            }
                        });
                     }
                     if(result_data.truckData.truckDetail.type=="")
                     {
                        $("#add_Type").val("");
                        $("#add_Type").selectmenu('refresh', true);
                     }
                     else if(result_data.truckData.truckDetail.type=="Dealer Used" || result_data.truckData.truckDetail.type=="dealer_used")
                     {
                        $("#add_Type").val("dealer_used");
                        $("#add_Type").selectmenu('refresh', true);
                     }
                     else if(result_data.truckData.truckDetail.type=="Dealer New" || result_data.truckData.truckDetail.type=="dealer_new")
                     {
                        $("#add_Type").val("dealer_new");
                        $("#add_Type").selectmenu('refresh', true);
                     }
                     else if(result_data.truckData.truckDetail.type=="Dealer Demo" || result_data.truckData.truckDetail.type=="dealer_demo")
                     {
                        $("#add_Type").val("dealer_demo");
                        $("#add_Type").selectmenu('refresh', true);
                     }
                     else if(result_data.truckData.truckDetail.type=="Private Used" || result_data.truckData.truckDetail.type=="private_used")
                     {
                        $("#add_Type").val("private_used");
                        $("#add_Type").selectmenu('refresh', true);
                     }
                     $("#add_Category").val(result_data.truckData.truckDetail.cat_1_id);
                     $("#add_Category").selectmenu('refresh', true);
                     load_Subcatagory(result_data.truckData.truckDetail.cat_1_id);
                     cateValue = true;
            }
            else
            {
                navigator.notification.alert('Truck Information not available', function(){},'Truck Sales','OK');
                return;
            }
        },
        function(result_data)
        {
            // $.mobile.changePage("#pageProductDetails", {transition:"slide"})
            navigator.notification.alert('Cannot connect to the server', function(){},'Truck Sales','OK');
            console.log('failure '+JSON.stringify(result_data));
            return;
        });

}

function addsubcate()
{
    if(only_lising.truckData.truckDetail.cat_2_name!="")
    {
        if(only_lising.truckData.truckDetail.hasSubcategory==0)
        {
            var val_Option = only_lising.truckData.truckDetail.cat_2_id+'_'+only_lising.truckData.truckDetail.hasSubcategory;
        }
        else
        {
            var val_Option = only_lising.truckData.truckDetail.cat_2_id+'_'+only_lising.truckData.truckDetail.hasSubcategory;
            $('#add_CategoryContainer').empty();
            $('#add_CategoryContainer').append('<select id="add_ThreeCategory"><option disabled selected style="display:none;">Additional Category</option></select>');
            $('#add_CategoryContainer').trigger('create');
        }
        //alert('opt' + val_Option);
        $("#add_SubCategory").val(val_Option);
        $("#add_SubCategory").selectmenu('refresh', true);
        //                        var subCateSelected = $("#add_SubCategory").find("option:selected");
        //                        var textSubCategory   = subCateSelected.text();
        //alert('sub '+textSubCategory)
        sub_cateValue = true;
        load_AdditionalCatagory(val_Option);
    }
    else
    {
        $('#add_SubCategory').val("0_0");
        $('#add_SubCategory').selectmenu('refresh', true);
        
    }
}

function additional_subcate()
{
    if(only_lising.truckData.truckDetail.cat_3_name=="")
    {
        $("#add_ThreeCategory").val(only_lising.truckData.truckDetail.cat_3_name);
        $("#add_ThreeCategory").selectmenu('refresh', true);
    }
    else
    {
        $("#add_ThreeCategory").val(only_lising.truckData.truckDetail.cat_3_id);
        $("#add_ThreeCategory").selectmenu('refresh', true);
        //var subCateSelected = $("#add_ThreeCategory").find("option:selected");
        //var textSubCategory   = subCateSelected.text();
    }
}


function set_model()
{
    if(only_lising.truckData.truckDetail.model=="")
    {
        $("#add_Model").val(only_lising.truckData.truckDetail.model);
        $("#add_Model").selectmenu('refresh', true);
    }
    else
    {
        $.each(modelArr,function(idx, obj)
               {
               if(only_lising.truckData.truckDetail.model==idx)
               {
               var modelval = obj;
               //alert(modelval);
               $("#add_Model").val(modelval);
               $("#add_Model").selectmenu('refresh', true);
               }
               });
    }
}

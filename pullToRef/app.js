(function () {
 
 var $list = $('.list'),
 itemCount = 0;
 
 // Add x dummy items to the list
 function addItems(x) {
 for (var i = 0; i < x; i++) {
 itemCount++;
 $list.append('<li class="topcoat-list__item">Item ' + itemCount + '</li>');
 }
 }
 
 $('.scrollable').pullToRefresh({
                                callback: function (id) {
                                console.log('callback '+id);
                                var deferred = $.Deferred();
                                setTimeout(function () {
                                           // Simulate a refresh: add 3 items to the list
                                           if(id=='container_ressearcgPage'){
                                                addMoreResults();
                                           }else if(id=='fDealerResult'){
                                                console.log('fDealerResult');
                                                addMoreDealers();
                                           }
                                           
                                           deferred.resolve();
                                           }, 2000);
                                
                                return deferred.promise();
                                }
                                });
 
 
 
 $('.mylistScroll').pullToRefresh1({
                                   callback: function (el) {
                                   console.log('callback mylisting'+el);
                                   var deferred = $.Deferred();
                                   setTimeout(function () {
                                              // Simulate a refresh: add 3 items to the list
                                              // addMoreResults();
                                              if(el=='myListingData'){
                                             // alert('myListingData');
                                              myListingData();
                                              
                                              }else if(el=='dashBoardData'){
                                                   // alert('dashBoardData');
                                                    dashBoardData();
                                              
                                              }
                                              else if(el=='favorite_List'){
                                                    console.log('fDealerResult');
                                                    favoriteList();
                                              }
                                              deferred.resolve();
                                              }, 2000);
                                   
                                   return deferred.promise();
                                   }
                                   });

 }());

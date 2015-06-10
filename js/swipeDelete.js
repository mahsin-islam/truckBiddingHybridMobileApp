function swipeRef(){
  //  alert();
      function prevent_default(e) {
      e.preventDefault();
      }
      
      function disable_scroll() {
      $(document).on('touchmove', prevent_default);
      }
      
      function enable_scroll() {
      $(document).unbind('touchmove', prevent_default)
      }
      
      var x;
      $(document)
      .on('touchstart','.swipe-delete li > a', function(e) {
          console.log(e.originalEvent.pageX)
          $('.swipe-delete li > a.open').css('left', '0px').removeClass('open') // close em all
          $(e.currentTarget).addClass('open')
          x = e.originalEvent.targetTouches[0].pageX // anchor point
          })
      .on('touchmove','.swipe-delete li > a', function(e) {
          var change = e.originalEvent.targetTouches[0].pageX - x
          // alert("1 : "+change);
          change = Math.min(Math.max(-100, change), 100) // restrict to -100px left, 0px right
          if(change>0){
          return;
          }
          // alert("2 : "+change);
          e.currentTarget.style.left = change + 'px'
          if (change < -10) disable_scroll() // disable scroll once we hit 10px horizontal slide
          })
      .on('touchend','.swipe-delete li > a', function(e) {
          var left = parseInt(e.currentTarget.style.left)
          var new_left;
          if (left < -35) {
          new_left = '-250px'
          } else if (left > 35) {
          new_left = '0px'
          } else {
          new_left = '0px'
          }
          // e.currentTarget.style.left = new_left
          $(e.currentTarget).animate({left: new_left}, 200)
          enable_scroll()
          });
      
      $('li .delete-btn').on('touchend', function(e) {
                             e.preventDefault()
                             $(this).parents('li').slideUp('fast', function() {
                                                           $(this).remove()
                                                           })
                             })
      
      $('li .edit-btn').on('touchend', function(e) {
                           e.preventDefault()
                           $(this).parents('li').children('a').html('edited')
                    })
   
    
}



$(document).on('click','.main_menus', function(){
                      // alert();
//               var active= $.mobile.activePage.attr('id')
//               var panelId=$('#'+active).find('[data-role=panel]').attr('id');
//               alert(active+'  '+panelId);
//                $('#'+panelId).panel( "close" );
        })

$(document).on( "panelbeforeclose", "panelists", function( event, ui ) {
              // alert('close');
               
               } );

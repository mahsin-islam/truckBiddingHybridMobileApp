/*!
* jquery.plugin.pullToRefresh.js
* version 1.0
* author: Damien Antipa
* https://github.com/dantipa/pull-to-refresh-js
*/
(function( $ ){

	$.fn.pullToRefresh = function( options ) {
       // alert(JSON.stringify(options));
        var isTouch = !!('ontouchstart' in window);
		var	cfg = $.extend(true, {
                        message: {
                            pull: 'Pull to refresh',
                            release: 'Release to refresh',
                            loading: 'Loading...'
                           }
                        }, options);
        var html = '<div class="pull-to-refresh">' +
				'<div class="icon"></div>' +
				'<div class="message">' +
					'<i class="arrow"></i>' +
                    '<div class="topcoat-spinner spinner large"></div>' +
//					'<i class="spinner large"></i>' +
					'<span class="pull">' + cfg.message.pull + '</span>' +
					'<span class="release">' + cfg.message.release + '</span>' +
					'<span class="loading">' + cfg.message.loading + '</span>' +
				  '</div>' +
				'</div>';



		return this.each(function() {
			if (!isTouch) {
				return;
			}
                         
			var e = $(this).append(html),
				content = e.find('.wrap'),
				ptr = e.find('.pull-to-refresh'),
				arrow = e.find('.arrow'),
				spinner = e.find('.spinner'),
				pull = e.find('.pull'),
				release = e.find('.release'),
				loading = e.find('.loading'),
				ptrHeight = ptr.height(),
				arrowDelay = ptrHeight / 3 * 2,
				isActivated = false,
				isLoading = false;
              //  console.log('ptr : '+ptr+'  ptrheight : '+ptrHeight+' arrowdelay :'+arrowdelay);
			content.on('touchstart', function (ev) {
                      // alert(e.scrollTop());
				if (e.scrollTop() === 0) { // fix scrolling
					e.scrollTop(1);
				}
			}).on('touchmove', function (ev) {
                  
                  var top = e.scrollTop();
                  //alert(top);
				var	deg = 180 - (top < -ptrHeight ? 180 : // degrees to move for the arrow (starts at 180° and decreases)
						  (top < -arrowDelay ? Math.round(180 / (ptrHeight - arrowDelay) * (-top - arrowDelay)) 
						  : 0));
                 // console.log('degree : '+deg)

				if (isLoading) { // if is already loading -> do nothing
					return true;
				}

				arrow.show();
				arrow.css('transform', 'rotate('+ (-deg) + 'deg)'); // move arrow

				spinner.hide();
                  //alert($(this).find('ul').attr('id'));
                  var elId='#'+$(this).find('ul').attr('id');
                var space = -window.innerHeight -  document.querySelector(elId).offsetTop + document.querySelector(elId).offsetHeight
                   //console.log(window.innerHeight+" , "+document.querySelector(elId).offsetTop+" , "+document.querySelector(elId).offsetHeight)
//                  var space = -window.innerHeight -  document.querySelector('#container_ressearcgPage').offsetTop + document.querySelector('#container_ressearcgPage').offsetHeight
//                  console.log(window.innerHeight+" , "+document.querySelector('#container_ressearcgPage').offsetTop+" , "+document.querySelector('#container_ressearcgPage').offsetHeight)
                  
                  if($(this).find('ul').attr('id')=='fDealerResult'){
                        space=space+220;
                  
                  }

                    console.log(top+"    "+space);
				if (top > space) {
                 // console.log(top+" if "+ptrHeight)// release state
					release.css('opacity', 1);
					pull.css('opacity', 0);
					loading.css('opacity', 0);
					

					isActivated = true;
				} else if (top > ptrHeight) {
                   console.log(top+" else  "+ptrHeight)// pull state
					release.css('opacity', 0);
					loading.css('opacity', 0);
					pull.css('opacity', 1);

					isActivated = false;
				}
                  }).on('touchend', function(ev) {
                        //alert('te');
				var top = e.scrollTop();
				
				if (isActivated) { // loading state
					isLoading = true;
					isActivated = false;

					release.css('opacity', 0);;
					pull.css('opacity', 0);
					loading.css('opacity', 1);
					arrow.hide();
					spinner.show();

					ptr.css('position', 'static');
					cfg.callback($(this).find('ul').attr('id')).done(function() {
						ptr.animate({
							height: 10
						}, 'fast', 'linear', function () {
							ptr.css({
								position: 'absolute',
								height: ptrHeight
							});
							isLoading = false;
						});
					});
				}
			});
		});

	};
})( jQuery );

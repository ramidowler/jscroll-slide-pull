/* based off of jScrollTouch plugin 1.1
 *
 * by Damien Rottemberg damien@dealinium.com
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 *      modified for horizontal card support
 *          Gerry Straathof nosemonger@gmail.com
 */
(function($){
 "use strict";
	 $.fn.jScrollTouch = function () {
		 return this.each(function() {
						  // The two concepts for each page
						  // scroller = text scrolling area
						  // slider = full-screen page
						  // previous = the page before the current
						  // next = the page after the current
						  // pull = the titlebar that pulls down the contents
						
					  var height = 		$('body').height();
					  var scroller = 	$(this).find('.article-scroller');
					  var slider = 		$(this);
							  
					  var previous = 	slider.prev();
					  var next = 		slider.next();
					  var pull = 		$(this).find('.titleBlock');
						  
						  // used to know when function is done.
						  $(this).addClass('done');
				  var slideOn = true;
					if (slider.attr('id')=='overlayed'){ 
						  slideOn = false;
						  };
				  var pullHeight = $(pull).outerHeight(); // height is different for each title
						  
				  var pullBottomMax = height-pullHeight; //the remainder of space
				  var pullTop = 0;
						  
				  var pullPos = pull.scrollTop();		 
				
				  scroller.css({'overflow': 'auto','position':'relative'});
						  
				  /*
				   if (mobile) {
				   //console.log('touch only');
				   scroller.css({'overflow': 'hidden','position':'relative'});
				   } else {
				   //console.log('desk only');
				   scroller.css({'overflow': 'auto','position':'relative'});
				   }*/
				  
				  var height = 0;
				  var cpos = scroller.scrollTop()
				  scroller.scrollTop(100000);
				  height = scroller.scrollTop();
				  scroller.scrollTop(cpos);
				  var fullheight = height + scroller.outerHeight();
				  var scrollbarV_length = scroller.innerHeight()*(scroller.innerHeight()/fullheight)+2;
				  
				  var width = 0;
				  var minWidth=($("body").width())*0.15;
				  var lpos = slider.scrollLeft();
				  slider.scrollLeft(100000);
				  width = slider.scrollLeft();
				  slider.scrollLeft(lpos);
				  var fullwidth = width + scroller.outerWidth();
						  //  var scrollbarH_length = scroller.innerWidth()*(scroller.innerWidth()/fullwidth)+2;
				  /*
				  if(mobile){
					  var scrollbarV = $('<div></div>');
						    scrollbarV.css({	'display':'none',
										'position':'absolute',
										'width':'5px',
										'height':scrollbarV_length+'px',
										'left':width-10+'px',
										'top':0,'background':'black',
										'border':'1px white solid',
										'-webkit-border-radius':'5px',
										'opacity':'0.9' });
					/*  
					  var scrollbarH = $('<div></div>'); //not used
						  scrollbarH.css({	'display':'none',
											'position':'absolute',
											'height':'5px',
											'width':scrollbarH_length+'px',
											'top':scroller.innerHeight()-7+'px',
											'left':0,'background':'black',
											'border':'1px white solid',
											'-webkit-border-radius':'5px',
											'opacity':'0.9'});
				   * /
						    if(height) scroller.append(scrollbarV);
						  //  if(width) slider.append(scrollbarH);
				  }
						  */
						  // these two chceks are to prevent sliding if
						  // slider is animated or it is overlayed image
			currentPage = JSON.parse(localStorage.getItem('currentPage'));
			var remover =  $('.article-wrapper:eq(' + currentPage + ')');
			
			  if (!remover.is(':animated')) {
				  
				  slider.bind('mousedown touchstart',function(e){
						  
							  e.stopPropagation();
					  width=$("body").width();
					  height=$("body").height();
					  
							  
							  slider.css({'-webkit-transform':'translate2d(0,0)'});
							  
					  if(mobile){
						  e = e.originalEvent.touches[0];
							  //	  scrollbarV.show();
							  //	  scrollbarH.show();
					  }
					  
					  if (slideOn==true){		  
							  $('.active').toggleClass('active');
							  slider.stop(false, true).addClass('active').removeClass('hidder');
					  }
					  if ($('.article-wrapper').length>1){
						  $('.article-wrapper').not('.active').addClass('hidder');
							  }
					  if(previous.is(':animated')){
							  previous.stop(true, true);
						  }
					  if (next.is(':animated')){
					  next.stop(true, true);
						  }
						previous.removeClass('hidder');
						next.removeClass('hidder');
							  
							  //  previous.css('style','');
							  //	  next.css('style','');
							  
					  var initX = e.pageX;
					  var sX = e.pageX;
					  var sWX = 0;
					  
					  var initY = e.pageY;
					  var sY = e.pageY;
					  var sWY = 0;
					  
					  var prevsWX = 0; 	//stores the previous sWX
					  
					  var scrollDirection = 0;
					  var nextpage = 0;
					  
					  var display = false;
					  var displayed = false;
					  
					  cpos = scroller.scrollTop();
					  
					  slider.bind('mousemove touchmove ',function(ev){
						  if(mobile){
							  ev.preventDefault();
							  ev = ev.originalEvent.touches[0];
						  }	
								  //	  ev.stopPropagation();
								  //	currentPage=parseInt(slider.attr("id"));
						  var top = cpos-(ev.pageY-sY);
						  
						  var left =  lpos-(ev.pageX-sX);
						  
						  sWX = sWX-(sX-ev.pageX);
						  sX = ev.pageX;
						  
						  sWY = sWY-(sY-ev.pageY);
						  sY = ev.pageY;
						  
						  var horDistance = Math.abs(sWX);
						  var verDistance = Math.abs(sWY);
								  
						  if (scrollDirection ==0){ // haven't checked direction yet
							  if ( verDistance < horDistance) {
								  scrollDirection = 1; // moving horizontally
							  } else if ( verDistance > horDistance) {					  
								  scrollDirection = 2; // moving vertically
							  }
						  }
						  if (scrollDirection == 2 ){						//set up the scrolling movement
							  //set up the scroll bars
							  scroller.scrollTop(top);
							  cpos = scroller.scrollTop(); 
							  sY = ev.pageY;
							/*	  
							  if(mobile){
							  scrollbarV.css({	'left':Math.min(scroller.innerWidth()-7+lpos,fullwidth)+'px',
											 	'top':Math.min(cpos+cpos*scroller.innerHeight()/fullheight,fullheight-scrollbarV_length)+'px'});
								  //  scrollbarH.css({	'top':Math.min(scroller.innerHeight()-7+cpos,fullheight)+'px',
								  //		 	'left':Math.min(lpos+lpos*scroller.innerWidth()/fullwidth,fullwidth-scrollbarH_length)+'px'});
							  } */
						  }
								  
						  if (scrollDirection == 1 && slideOn==true){						//set up the sideways movement
								  
								  
								  slider.css('left',sWX+'px');				//page follows finger
								  
								  //slider.animate({'left':sWX+'px'},'fast');
								  // 	unused for now
								  //  	previous.css('left',(sWX-width)+'px'); 	//moves prev with the top
								  //   	next.css('left',(sWX+width)+'px');		//moves next with the top
								  
								  if (!((Math.abs(prevsWX)/prevsWX) == (Math.abs(sWX)/sWX))) {
								  //	checking to see if we are going in the same direction still
								
									  if (sWX<0) { 							//moving right
										  display = true;
										  nextPage = currentPage + 1;
										  if (nextPage > maxPage+1){		//don't display any new pages
											  nextPage = maxPage+1;
											  display = false;
										  } else { 			
											//  	display right page under the current page
											//		hide the previous page, show the next page
											
								  		previous.toggleClass('hidder');
								  		next.css('style','').removeClass('hidder');
											display = true;                      
											} 
										} 
								  
									  if (sWX>0) { 							//moving Left
										  display = true;
										  nextPage = currentPage - 1;
										  if (nextPage< 0 ){			  
										  nextPage = 0;
											  display = false;
										  }  else{			
												//		display left page under the current page
												//		hide the next page, show the previous page
											
								  		next.toggleClass('hidder');	
								  		previous.css('style','').removeClass('hidder');
											display = true;
											} 
										} 
								  }
								  prevsWX = sWX;
							} // 	end of same direction check
							 
						}); //end of sideways scroll check
					  
					  	slider.bind('mouseup touchend',function(ev){	
							slider.unbind('mousemove touchmove mouseup touchend');
							display = false;
							if(mobile){
							  ev = ev.originalEvent.touches[0];
									//  scrollbarV.fadeOut();
									//  scrollbarH.fadeOut();
							}
							if (scrollDirection ==1 && slideOn==true){	
									// only perform horizontal changes
								  //      sX = ev.pageX;
								  //      var ultimate = initX-sX;
								var distance = Math.abs(initX-sX);
									
								if (nextPage < 1){		
									//	can't go past beginning
								  distance = 0; 
								}
								if (nextPage > maxPage){	
									//	can't go past end
								  distance = 0; 
								}
								if (sWX == 0){
								  // do nothing
								} else if ( sWX>0 ) {			//are we moving the page to the left?
									if(distance>minWidth){ 
										//	move to new page if we moved 25% of the width
										slider.stop(true,true).animate({'left':width+'px'},animTime/2,'easeOutBounce',function(){
											previous.css('left','0').addClass('active');
											next.addClass('hidder');
											slider.removeClass('active').addClass('hidder').attr('style','');
											currentPage = nextPage;
											localStorage.setItem('currentPage',JSON.stringify(currentPage));
										});   
									}else{					//move back into place. Rehide the next/prev page afterwards
									  slider.stop(true,true).animate({'left':0+'px'},100,'easeOutBounce',function(){
									});
								} // end of left check
								  
								} else if ( sWX<0 ){			//are we moving the page to the right?
									  if(distance>minWidth){	
										//	move to new page if we moved more than 25%
										slider.stop(true,true).animate({'left':-width+'px'},animTime/2,'easeOutBounce',function(){
											next.css('left','0').addClass('active');
											slider.removeClass('active').addClass('hidder').attr('style','');
											previous.addClass('hidder');
											currentPage = nextPage;
											localStorage.setItem('currentPage',JSON.stringify(currentPage));
										});
								}else{					//move back into place. Rehide the next/prev page afterwards
									  slider.stop(true,true).animate({'left':0+'px'},100,'easeOutBounce',function(){
									
									}); 
								} //end of right check
							}// finished horizontal checks
						}
					}); //end mouse/touch end
							  
							  scrollDone = scrollDone+1;
			}); //end mouse/touch start
		  } // end of two checks (remover:animated & slideOn)
					
						  
			  // start of pull-down for title
		  pull.bind('mousedown touchstart',function(e){
					e.stopPropagation();
					if(mobile){
					e.preventDefault();
					e = e.originalEvent.touches[0];
					}	
					//e = e.originalEvent.touches[0];
					slider.unbind('mousemove touchmove mouseup touchend');
					//var pullPos = pull.scrollTop();
					
					var initY = e.pageY;
					var sY = e.pageY;
					var sWY = 0;
					
					var prevsWY = 0;
					var pullDistance = 0;
					var pullCurrent = pull.offset();
					var pullPos = pull.offset().top;
					$(document).bind('mousemove touchmove ',function(ev){
									 if(mobile){
									 ev.preventDefault();
									 ev = ev.originalEvent.touches[0];
									 }	 
						pullPos = pull.offset().top;		 
						// console.log('position '+pullPos+' current '+sY);
						pullTop = pullPos - (ev.pageY-sY);
						//	  var current = pull.offset();
						//	 var currentTop = current.top;
						sWY = sWY-(sY-ev.pageY);
						sY = ev.pageY;

						pullDistance = Math.abs(sWY);
						pullDirection =sWY/pullDistance;

						sY = ev.pageY;

						pull.css('top',sY+'px');
								
					}); //end of pull-down scroll check
					
					$(document).bind('mouseup touchend',function(ev){	
						$(document).unbind('mousemove touchmove mouseup touchend');
						pull.unbind('mousemove touchmove mouseup touchend');
									 
									 //		 console.log(sWY);
						 if (sWY>0) {// are we moving down?
									 // console.log('moving down');
							  if (pullDistance > 100) {
								  pull.animate({'top':pullBottomMax+'px'},animTime/2,'easeOutBounce',function(){
										 });
							 } else { pull.animate({'top':'0px'},animTime/2,'easeOutBounce',function(){
										 });
							 } // end of top check
									 } else if (sWY<0){ //are we moving the page up?
									 // console.log('moving up');
							  if (pullDistance <100 && pullDistance!=0){
									 
									 pull.animate({'top':pullBottomMax+'px'},animTime/2,'easeOutBounce',function(){
									 });
							 } else {pull.animate({'top':'0px'},animTime/2,'easeOutBounce',function(){
											});
									 } // end of bottom check
						 }
							  distance = 0;
					});
			}); //end pull bind
								
		}); //end return each(?) function?

 } //end 'inner' function
 return;
 
 })(jQuery); //  end it all…



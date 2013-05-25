/*
 * jQuery firefly plugin 0.2
 *
 *
 * Copyright (c) 2010 Dharmveer Motyar
 * http://motyar.blogspot.com
 * 
 * $Id$
 * 
 * licensed under the MIT licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *  
 *
 * Creates a firefly effect.
 *
 * @example $.firefly();
 *
 * @name firefly
 * @type jQuery
 * @cat Plugins/firefly
 */
 (function($) { 
	/*
	 * Plugin defaults 
	 */
	var defaults = {
			images : ['http://dharmmotyar.googlecode.com/svn/trunk/images/spark.png', 'http://dharmmotyar.googlecode.com/svn/trunk/images//spark2.png',
			'http://dharmmotyar.googlecode.com/svn/trunk/images/spark3.png', 'http://dharmmotyar.googlecode.com/svn/trunk/images/spark4.png'],
			total : 10,
			ofTop: 0,
			ofLeft: 0,
			on:'document.body'

	};
	

	$.firefly = function(settings) {
			$.firefly.settings = $.extend({}, defaults, settings);
			$.firefly.eleHeight = $($.firefly.settings.on).height();
			$.firefly.eleWidth = $($.firefly.settings.on).width();
			if($.firefly.settings.on!='document.body'){
				var off = $($.firefly.settings.on).offset();
				$.firefly.offsetTop = off.top;
				$.firefly.offsetLeft = off.left;
				$.firefly.eleHeight = $($.firefly.settings.on).height();
				$.firefly.eleWidth = $($.firefly.settings.on).width();
			}
			else{
				$.firefly.offsetTop = 0;
				$.firefly.offsetLeft = 0;
				$.firefly.eleHeight = $(document.body).height();
				$.firefly.eleWidth = $(document.body).width();

			}

			
		
			if($.firefly.preloadImages()){
			for (i = 0; i < $.firefly.settings.total; i++){
				 $.firefly.fly($.firefly.create($.firefly.settings.images[$.firefly.random(($.firefly.settings.images).length)]));
			}
			}
			return;
	};
	
	/*
	 * Public Functions
	 */

	 $.firefly.create = function(img){
					spark = $('<img>').attr({'src' : img}).hide();
					
					 $($.firefly.settings.on).append(spark);
							return spark.css({
								            'position':'absolute',
												
										    'z-index': -1*$.firefly.random(20), //under all the stuff
											top: $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50)),	//offsets
											left:  $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50)) //offsets
											}).show();		
	 }
    


$.firefly.fly = function(sp) {
	
  $(sp).animate({
	  top: $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50)),	//offsets
	  left: $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50))
  }, (($.firefly.random(10) + 5) * 2000),function(){  $.firefly.fly(sp) } );
};

$.firefly.stop = function(sp) {
  $(sp).stop();
};


$.firefly.preloadImages = function() {
	var preloads = new Object();
	for (i = 0; i < ($.firefly.settings.images).length; i++){  
			preloads[i] = new Image(); preloads[i].src =  $.firefly.settings.images[i];
        }
	return true;
}

$.firefly.random = function(max) {
	return Math.ceil(Math.random() * max) - 1;
}
		
})(jQuery);


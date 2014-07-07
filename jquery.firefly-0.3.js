/*
 * jQuery firefly plugin 0.3
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
			total : 10,
			ofTop: 0,
			ofLeft: 0,
			on:'document.body',
			twinkle: 0.2,
			minPixel: 1,
			maxPixel: 2,
			color: '#fff'
	};
	$.firefly = function(settings) {

			$.firefly.settings = $.extend({}, defaults, settings);
			$.firefly.eleHeight = $($.firefly.settings.on).height();
			$.firefly.eleWidth = $($.firefly.settings.on).width();
			if($.firefly.settings.on!=='document.body'){
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

			
		

			for (i = 0; i < $.firefly.settings.total; i++){

				$.firefly.fly($.firefly.create($.firefly.randomPixel($.firefly.settings.minPixel, $.firefly.settings.maxPixel)));
			}

			return;
	};
	
	/*
	 * Public Functions
	 */

	 $.firefly.create = function(pixelSize){
		spark = $('<div>').hide();

		if($.firefly.settings.on === 'document.body')
			$(document.body).append(spark);
		else 
			$($.firefly.settings.on).append(spark);
		



		return spark.css({'position':'absolute',	
						'width' : pixelSize, 
						'height': pixelSize,
						'background-color': $.firefly.settings.color,
						'z-index': $.firefly.random(20), //under all the stuff
						top: $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50)),	//offsets
						left:  $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50)) //offsets
						}).show();

	 }
    


$.firefly.fly = function(sp) {
  
  $(sp).animate({
	  top: $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight-50)),	//offsets
	  left: $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth-50)),
	  opacity: $.firefly.opacity($.firefly.settings.twinkle)
  }, (($.firefly.random(10) + 5) * 2000),function(){  $.firefly.fly(sp) } );
};

$.firefly.stop = function(sp) {
  $(sp).stop();
};



$.firefly.randomPixel = function(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
$.firefly.random = function(max) {
	return Math.ceil(Math.random() * max) - 1;
}
// set twinkle.
$.firefly.opacity = function(min)
{
        op= Math.random();
        if(op < min)
                return 0;
        else
                return 1;
}		
})(jQuery);

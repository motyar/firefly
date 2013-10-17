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
			images : [
					'spark.png', 
					'spark2.png',
					'spark3.png', 
					'spark4.png'],

			total : 40,
			ofTop: 0,
			ofLeft: 0,
			ofBottom: -1,
			ofRight: -1,

			on: document.body
	};
	
	$.firefly = function(settings) {
			$.firefly.settings = $.extend({}, defaults, settings);
			$.firefly.eleHeight = $($.firefly.settings.on).height();
			$.firefly.eleWidth = $($.firefly.settings.on).width();
			
			
			$.firefly.offsetTop = $.firefly.settings.ofTop;
			$.firefly.offsetLeft = $.firefly.settings.ofLeft;
			
			if($.firefly.settings.ofBottom == -1)
			{
				$.firefly.offsetBottom = $.firefly.settings.ofTop;
			}
			else
			{
				$.firefly.offsetBottom = $.firefly.settings.ofBottom;
			}
			
			if($.firefly.settings.ofRight == -1)
			{
				$.firefly.offsetRight  = $.firefly.settings.ofLeft;
			}
			else
			{
				$.firefly.offsetRight = $.firefly.settings.ofRight;
			}	

		
			$.firefly.eleHeight = $($.firefly.settings.on).height();
			$.firefly.eleWidth = $($.firefly.settings.on).width();
			
			if($.firefly.preloadImages())
			{
				for (i = 0; i < $.firefly.settings.total; i++)
				{
 					 $.firefly.fly($.firefly.create($.firefly.settings.images[$.firefly.random(($.firefly.settings.images).length)]));
				}
			}
			
			return;
	};
	
	/*
	 * Public Functions
	 */

	 $.firefly.create = function(img)
	 {
					spark = $('<img>').attr({'src' : img}).hide();
					$(document.body).append(spark);

							return spark.css({
								            'position':'absolute',												
										    'z-index': -1*$.firefly.random(20), //under all the stuff
											top: $.firefly.offsetTop + $.firefly.random($.firefly.eleHeight-$.firefly.offsetBottom),	//offsets
											left:  $.firefly.offsetLeft + $.firefly.random($.firefly.eleWidth-$.firefly.offsetRight)   //offsets
											}).show();
	 }

$.firefly.fly = function(sp)
{
  $(sp).animate({
	top: $.firefly.offsetTop + $.firefly.random($.firefly.eleHeight-$.firefly.offsetBottom),	//offsets
	left:  $.firefly.offsetLeft + $.firefly.random($.firefly.eleWidth-$.firefly.offsetRight),   //offsets
	opacity: $.firefly.opacity()
  }, (($.firefly.random(10) + 5) * 2000),function(){   $.firefly.fly(sp)   } );
};

$.firefly.stop = function(sp)
{
	$(sp).stop();
};

$.firefly.preloadImages = function()
{
	var preloads = new Object();
	for (i = 0; i < ($.firefly.settings.images).length; i++)
	{
			preloads[i] = new Image();
			preloads[i].src =  $.firefly.settings.images[i];
	}
	return true;
}

$.firefly.random = function(max) {
	return Math.ceil(Math.random() * max) - 1;
}

$.firefly.opacity = function()
{
	op= Math.random();
	if(op < .2)
		return 0;
	else
		return 1;
}
	
})(jQuery);

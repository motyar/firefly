/*
* jQuery Firefly v0.1
* https://github.com/motyar/firefly

* Licensed under the MIT license.
* Copyright 2011 Dharmveer Motyar
* http://motyar.blogspot.com
*/
(function($){var defaults={images:["http://dharmmotyar.googlecode.com/svn/trunk/images/spark.png","http://dharmmotyar.googlecode.com/svn/trunk/images//spark2.png","http://dharmmotyar.googlecode.com/svn/trunk/images/spark3.png","http://dharmmotyar.googlecode.com/svn/trunk/images/spark4.png"],total:10,ofTop:0,ofLeft:0,on:"document.body",twinkle:0.2};$.firefly=function(settings){$.firefly.settings=$.extend({},defaults,settings);$.firefly.eleHeight=$($.firefly.settings.on).height();$.firefly.eleWidth=
$($.firefly.settings.on).width();if($.firefly.settings.on!=="document.body"){var off=$($.firefly.settings.on).offset();$.firefly.offsetTop=off.top;$.firefly.offsetLeft=off.left;$.firefly.eleHeight=$($.firefly.settings.on).height();$.firefly.eleWidth=$($.firefly.settings.on).width()}else{$.firefly.offsetTop=0;$.firefly.offsetLeft=0;$.firefly.eleHeight=$(document.body).height();$.firefly.eleWidth=$(document.body).width()}if($.firefly.preloadImages())for(i=0;i<$.firefly.settings.total;i++)$.firefly.fly($.firefly.create($.firefly.settings.images[$.firefly.random($.firefly.settings.images.length)]));
return};$.firefly.create=function(img){spark=$("<img>").attr({"src":img}).hide();if($.firefly.settings.on==="document.body")$(document.body).append(spark);else $($.firefly.settings.on).append(spark);return spark.css({"position":"absolute","z-index":-1*$.firefly.random(20),top:$.firefly.offsetTop+$.firefly.random($.firefly.eleHeight-50),left:$.firefly.offsetLeft+$.firefly.random($.firefly.eleWidth-50)}).show()};$.firefly.fly=function(sp){$(sp).animate({top:$.firefly.offsetTop+$.firefly.random($.firefly.eleHeight-
50),left:$.firefly.offsetLeft+$.firefly.random($.firefly.eleWidth-50),opacity:$.firefly.opacity($.firefly.settings.twinkle)},($.firefly.random(10)+5)*2E3,function(){$.firefly.fly(sp)})};$.firefly.stop=function(sp){$(sp).stop()};$.firefly.preloadImages=function(){var preloads=new Object;for(i=0;i<$.firefly.settings.images.length;i++){preloads[i]=new Image;preloads[i].src=$.firefly.settings.images[i]}return true};$.firefly.random=function(max){return Math.ceil(Math.random()*max)-1};$.firefly.opacity=
function(min){op=Math.random();if(op<min)return 0;else return 1}})(jQuery);
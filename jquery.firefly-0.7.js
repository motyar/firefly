/*
 * jQuery firefly plugin 0.7
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
(function ($) {
    /*
     * Plugin defaults
     */
    var defaults = {
        total: 10, // The amount of fireflies to create
        ofTop: 0, // The offset for the top
        ofLeft: 0, // The offset for the left
        on: 'document.body', // The content to put the fireflies in
        twinkle: 0.2, // The opacity of the fireflies
        minPixel: 1, // The smallest the fireflies can be
        maxPixel: 2, // The largest the fireflies can be
        color: '#fff', // The color of the fireflies
        namespace: 'jqueryFireFly', // The class the fireflies have
        zIndex: Math.ceil(Math.random() * 20) - 1, // The z-index on which the fireflies are placed on
        borderRadius: '50%', // The border radius for the fireflies
        _paused: false // Whether or not the fireflies is are paused
    };

    /**
     * Start the firefly instance, with the specific settings
     * @param {type} settings the settings to go by. Will default from the $.firefly.defaults variable
     * @returns {jquery_firefly-0_7_L22.$} the instance of firefly
     */
    $.firefly = function (settings) {
        $.firefly.settings = $.extend({}, defaults, settings);
        $.firefly.eleHeight = $($.firefly.settings.on).height(); // Set the height of the fireflies
        $.firefly.eleWidth = $($.firefly.settings.on).width(); // Set the width of the fireflies

        $(window).resize(function () {
            if ($.firefly.settings.on !== 'document.body') {
                var off = $($.firefly.settings.on).offset(); // Get the offsets from the settings
                $.firefly.offsetTop = off.top; // Set the offset from the top
                $.firefly.offsetLeft = off.left; // Set the offset from the left
                $.firefly.eleHeight = $($.firefly.settings.on).height(); // Set the height of the fireflies
                $.firefly.eleWidth = $($.firefly.settings.on).width(); // Set the width of the fireflies
            } else {
                $.firefly.offsetTop = 0; // Set the offset from the top
                $.firefly.offsetLeft = 0; // Set the offset from the left
                $.firefly.eleHeight = $(document.body).height(); // Set the height of the fireflies
                $.firefly.eleWidth = $(document.body).width(); // Set the width of the fireflies
            }
        });

        if ($.firefly.settings.on !== 'document.body') {
            var off = $($.firefly.settings.on).offset(); // Get the offsets from the settings
            $.firefly.offsetTop = off.top; // Set the offset from the top
            $.firefly.offsetLeft = off.left; // Set the offset from the left
            $.firefly.eleHeight = $($.firefly.settings.on).height(); // Set the height of the fireflies
            $.firefly.eleWidth = $($.firefly.settings.on).width(); // Set the width of the fireflies
        } else {
            $.firefly.offsetTop = 0; // Set the offset from the top
            $.firefly.offsetLeft = 0; // Set the offset from the left
            $.firefly.eleHeight = $(document.body).height(); // Set the height of the fireflies
            $.firefly.eleWidth = $(document.body).width(); // Set the width of the fireflies
        }

        for (i = 0; i < $.firefly.settings.total; i++) { // Run the next few lines of code for every firefly
            var randomPixel = $.firefly.randomPixel($.firefly.settings.minPixel, $.firefly.settings.maxPixel); // Get the size of the specific firefly
            var sp = $.firefly.create(randomPixel); // Create a new firefly using the size

            $.firefly.fly(sp); // Call the recursive fly function
        }

        $.firefly.sparks = $($.firefly.settings.on).children('.' + $.firefly.settings.namespace); // Create a list of all of the fireflies

        return this;
    };

    /**
     * Pause or unpause all of the fireflies from flying
     * @param {type} bool whether or not to pause the fireflies
     * @returns {undefined}
     */
    $.firefly.pause = function (bool) {
        $.firefly.settings._paused = true;

        if (bool) {
            $.each($.firefly.sparks, function (iter, sp) {
                $(sp).stop(true);
            });
        }
    };

    /**
     * Resume all of the fireflies to moving
     * @returns {undefined}
     */
    $.firefly.resume = function () {
        $.firefly.settings._paused = false;

        $.each($.firefly.sparks, function (iter, sp) {
            $.firefly.fly(sp);
        });
    };

    /**
     * Create a firefly from a specific size
     * @param {type} pixelSize the size to make the firefly
     * @returns {unresolved} the element for the firefly
     */
    $.firefly.create = function (pixelSize) {
        spark = $('<div>').hide();
        spark.addClass($.firefly.settings.namespace);
        $.firefly.settings._onSparkID++;

        if ($.firefly.settings.on === 'document.body') {
            $(document.body).append(spark);
        } else {
            $($.firefly.settings.on).append(spark);
        }

        return spark.css({
            'position': 'absolute', // Make the box moveable without constraints
            'width': pixelSize, // Set the width of the box
            'height': pixelSize, // Set the height of the box
            'background-color': $.firefly.settings.color, // Set the color of the box
            'z-index': $.firefly.settings.zIndex, // Potition it beneath the content
            'border-radius': $.firefly.settings.borderRadius, // Make the border of the box/img round
            'top': $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight - 50)), // Offset it to towards the bottom
            'left': $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth - 50)), // Offset it to towards the right
            'pointer-events': 'none' // Make it not selectable
        }).show();
    };

    /**
     * The recursive method to make the firefly move
     * @param {type} sp the firefly to move
     * @returns {undefined}
     */
    $.firefly.fly = function (sp) {
        $(sp).animate({
            top: $.firefly.offsetTop + $.firefly.random(($.firefly.eleHeight - 50)), // Offset it to towards the bottom
            left: $.firefly.offsetLeft + $.firefly.random(($.firefly.eleWidth - 50)), // Offset it to towards the right
            opacity: $.firefly.opacity($.firefly.settings.twinkle) // Make the box more or less visable
        }, {
            duration: (($.firefly.random(10) + 5) * 2000),
            done: function () {
                if (!$.firefly.settings._paused) {
                    $.firefly.fly(sp);
                }
            }
        });
    };

    /**
     * Get a random pixel size in a range
     * @param {type} min the minimum size the firefly can be
     * @param {type} max the maximum size the firefly can be
     * @returns {Number} the random size
     */
    $.firefly.randomPixel = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /**
     * Get a random number
     * @param {type} max the maximum the number can be
     * @returns {Number} the random number
     */
    $.firefly.random = function (max) {
        return Math.ceil(Math.random() * max) - 1;
    };

    /**
     * Get the opacity of a firefly, based on a percentage
     * @param {type} min the percent chance of it being 1
     * @returns {Number} the random opacity
     */
    $.firefly.opacity = function (min) {
        op = Math.random();
        if (op < min) {
            return 0;
        } else {
            return 1;
        }
    };
})(jQuery);

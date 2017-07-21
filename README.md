# Jquery Firefly
JQuery Firefly is a simple to use JQuery plugin that adds basic firefly functionality. Simply load it, and add a couple lines of code, and you have a working firefly effect.

## Changelog

0.7 Improvements:
- Mainly formatting updates
  * Added comments to mostly everything in the main file
  * Added documentation to all of the functions
- Fixed #12

0.3 Improvements:
- The plugin no longer uses images for sparks (should load faster and gives the freedom to change the color without modifying the image)
- properties minPixel and maxPixel used to specify the min and max size of the fireflies
- color property used to specify the color of the fireflies

# Usage

Simply copy this into your file, make a div element with the id of content, and the firefly effect will appear on that div box.

    $.firefly({
        color: '#fff',
        minPixel: 1,
        maxPixel: 3,
        total : 65,
        on: '#content'
    });


## Examples

A basic example of v0.6 is [here][1]

Here are few sites using it. (Please let me know if you are using it, I will add a link here)

[Radiance Wordpress theme][2]

  [1]: https://codepen.io/anon/pen/mWvWvX/
  [2]: http://www.yootheme.com/demo/wordpress/radiance
  [3]: http://www.backslash.gr/content/blog/webdevelopment/10-jquery-firefly-plugin
  
## Buy me half of a coffee if you like!
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](http://paypal.me/motyar/)

# Basic example of v0.6 is [here][1]

0.3 Improvments:
- The plugin no longer uses images for sparks (should load faster and gives the freedom to change the color without modifying the image)
- properties minPixel and maxPixel used to specify the min and max size of the fireflies
- color property used to specify the color of the fireflies

Example:


    $.firefly({
        color: '#fff',
        minPixel: 1,
        maxPixel: 3,
        total : 65,
        on: 'header'
    });



Here are few sites using it. (Please let me know if you are using it, I will add a link here)

[Radiance Wordpress theme][2]

  [1]: https://codepen.io/anon/pen/mWvWvX/
  [2]: http://www.yootheme.com/demo/wordpress/radiance
  [3]: http://www.backslash.gr/content/blog/webdevelopment/10-jquery-firefly-plugin
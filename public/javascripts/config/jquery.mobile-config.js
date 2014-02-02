define(['jquery'], function ($) {

    console.log('jquery.mobile-config.js');

    $(document).on('mobileinit', function () {


        console.log('jquery.mobile-config.js mobileinit');

        $.mobile.ajaxEnabled           = false;
        $.mobile.linkBindingEnabled    = false;
        $.mobile.hashListeningEnabled  = false;
        $.mobile.pushStateEnabled      = false;
        $.mobile.defaultPageTransition = 'none'; // 'none', 'slide'
        $.mobile.page.prototype.options.theme = 'b'; // globally set theme

        // Default options for loader
        // $.mobile.loader.prototype.options.text        = 'loading';
        // $.mobile.loader.prototype.options.textVisible = false;
        // $.mobile.loader.prototype.options.theme       = 'a';
        // $.mobile.loader.prototype.options.html        = '';
    });

});
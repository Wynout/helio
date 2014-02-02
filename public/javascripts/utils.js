/*
|---------------------------------------------------------------------------------
| Utils                                                                   utils.js
|---------------------------------------------------------------------------------
*/
define(['jquery'], function ($) {

    var utils = {

        showAlert: function (title, text, className) {

            $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
            $('.alert').addClass(className);
            $('.alert').html('<strong>' + title + '</strong> ' + text);
            $('.alert').show();
        },

        hideAlert: function () {

            $('.alert').hide();
        }
    };

    return utils;
});
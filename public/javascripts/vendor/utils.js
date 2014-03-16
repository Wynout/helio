/*
|------------------------------------------------------------------------------
| Utils                                                                utils.js
|------------------------------------------------------------------------------
*/
define([], function () {

    var Utils = {

        isCapslockOn: function (event) {

            event = (event) ? event : window.event;
            var charCode = false;

            if (event.which) {

                charCode = event.which;
            } else if (event.keyCode) {

                charCode = event.keyCode;
            }

            var shifton = false;
            if (event.shiftKey) {

                shifton = event.shiftKey;
            } else if (event.modifiers) {

                shifton = !!(event.modifiers & 4);
            }

            if (charCode>=97 && charCode<=122 && shifton) {

                return true;
            }

            if (charCode>=65 && charCode<=90 && !shifton) {

                return true;
            }

            return false;
        }
    };

    return Utils;
});

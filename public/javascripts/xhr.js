/*
|------------------------------------------------------------------------------
| Xhr Module                                                             xhr.js
|------------------------------------------------------------------------------
*/
define(['underscore'], function (_) {

    var xhr = {
        /**
         * Returns error object with error info
         *
         * @param  {Object} jqXHR jQuery XHR Object
         * @return {Object} error object
         */
        errorHandler: function (jqXHR) {

            var defaults = {
                    error: {
                        type: jqXHR.status,
                        message: jqXHR.statusText
                    }
                };
            var response = _.extend(defaults, jqXHR.responseJSON);
            return response.error;
        }
    };

    return xhr;
});

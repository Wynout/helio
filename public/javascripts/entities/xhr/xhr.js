/*
|------------------------------------------------------------------------------
| Xhr Module                                                             xhr.js
|------------------------------------------------------------------------------
*/
define(['underscore', 'i18n!nls/xhr'], function (_, nlsXhr) {

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
                        status: jqXHR.status,
                        type: 'unknown',
                        message: jqXHR.statusText
                    }
                },
                response = _.extend(defaults, jqXHR.responseJSON);

            // Set error.message translation
            if (_.has(nlsXhr.xhrErrorMessages, response.error.message)) {

                response.error.message = nlsXhr.xhrErrorMessages[response.error.message];
            }

            return response.error;
        }
    };

    return xhr;
});

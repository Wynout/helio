/*
|------------------------------------------------------------------------------
| Xhr Module                                                             xhr.js
|------------------------------------------------------------------------------
*/
define(['underscore', 'msgbus', 'views/xhrErrorView'], function (_, MsgBus, XhrErrorView) {

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
            };
            var response = _.extend(defaults, jqXHR.responseJSON);

            console.log('xhr errorHandler: ', jqXHR.status, jqXHR.statusText, jqXHR.responseJSON);
            return response.error;
        }
    };

    return xhr;
});

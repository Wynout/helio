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


            // if (response.error.type==='authorization') {
            //     console.log("MsgBus.events.trigger('account:login');");
            //     MsgBus.events.trigger('account:login');
            // } else {

            //     var xhrErrorView = new XhrErrorView({error: response.error});
            //     MsgBus.commands.execute('popup:show', xhrErrorView);
            // }

            console.log(jqXHR.status, jqXHR.statusText, jqXHR.responseJSON);
            return response.error;
        }
    };

    return xhr;
});

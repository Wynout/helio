/*
|------------------------------------------------------------------------------
| XHR Error Handler View                                        xhrErrorView.js
|------------------------------------------------------------------------------
*/
define(['marionette', 'msgbus', 'hbs!views/xhrErrorTemplate'], function (Marionette, MsgBus, xhrErrorTemplate) {

    /**
     * XHR Error view
     */
    var XhrErrorView = Marionette.ItemView.extend({
        template: xhrErrorTemplate,

        events: {
            'click .close': 'close',
        },

        serializeData: function () {

            return {
                error: this.options.error,
                account: MsgBus.reqres.request('account:info')
            };
        },

        close: function () {

            MsgBus.commands.execute('popup:close');
            return false;
        }
    });

    return XhrErrorView;
});
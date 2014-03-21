/*
|------------------------------------------------------------------------------
| XHR Error Handler View                                        xhrErrorView.js
|------------------------------------------------------------------------------
*/
define([
    'marionette',
    'msgbus',
    'hbs!views/xhrErrorTemplate',
    'i18n!nls/xhr'],
function (
    Marionette,
    MsgBus,
    xhrErrorTemplate,
    nlsXhr) {

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
                modal: nlsXhr.modal,
                error: this.options.error,
                account: MsgBus.reqres.request('account:token:info')
            };
        },

        close: function () {

            MsgBus.commands.execute('popup:close');
            return false;
        }
    });

    return XhrErrorView;
});
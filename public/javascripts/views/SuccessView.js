/*
|------------------------------------------------------------------------------
| General Success View                                           SuccessView.js
|------------------------------------------------------------------------------
*/
define([
    'underscore',
    'marionette',
    'hbs!views/SuccessTemplate'],
function (
    _,
    Marionette,
    successTemplate) {


    /**
     * General Success View
     */
    var SuccessView = Marionette.ItemView.extend({
        template: successTemplate,

        serializeData: function () {

            var defaults = {
                title: '',
                message: ''
            };
            return _.defaults(this.options, defaults);
        },

        onShow: function () {

            this.$el.delay(1500).fadeOut(300);
        }
    });

    return SuccessView;
});

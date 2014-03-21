/*
|------------------------------------------------------------------------------
| Wine Delete Controller                                WineDeleteController.js
|------------------------------------------------------------------------------
*/
define(['backbone', 'msgbus', 'apps/wines/delete/WineDeleteView'],
function (Backbone, MsgBus, WineDeleteView) {

    var controller = {

        deleteWineConfirm: function (model) {

            var View = new WineDeleteView({model: model});
            MsgBus.commands.execute('modal:show', View);
        },

        deleteWine: function (model) {

            var deleteWine = MsgBus.reqres.request('wine:entity:delete', model);

            deleteWine
                .done(function (model, response, options) {

                    Backbone.history.navigate('wines', {trigger: true});
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });
        }

    };

    return controller;
});
/*
|------------------------------------------------------------------------------
| Wine Delete Controller                                WineDeleteController.js
|------------------------------------------------------------------------------
*/
define(['msgbus', 'apps/wines/delete/WineDeleteView'],
function (MsgBus, WineDeleteView) {

    var controller = {

        deleteWineConfirm: function (model) {

            var View = new WineDeleteView.confirm({model: model});
            MsgBus.commands.execute('popup:show', View);
        },

        deleteWine: function (model) {

            var deleteWine = MsgBus.reqres.request('wine:entity:delete', model);

            deleteWine
                .done(function (model, response, options) {

                    var View = new WineDeleteView.success({model: model});
                    MsgBus.commands.execute('popup:show', View);
                })
                .fail(function (model, xhr, options) {

                    var View = new WineDeleteView.error({model: model});
                    MsgBus.commands.execute('popup:show', View);
                });
        }

    };

    return controller;
});
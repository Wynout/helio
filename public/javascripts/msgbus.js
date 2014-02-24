/*
|------------------------------------------------------------------------------
| Msgbus decoupled from App                                           msgbus.js
|------------------------------------------------------------------------------
*/
define(['backbone.wreqr'], function (Wreqr) {

    return {
        reqres: new Wreqr.RequestResponse(),
        commands: new Wreqr.Commands(),
        events: new Wreqr.EventAggregator()
    };
});
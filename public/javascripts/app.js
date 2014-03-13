/*
|------------------------------------------------------------------------------
| Main Application Object                                                app.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'layouts/AppLayout',
    'views/HeaderView',
    'views/NavPanelView',
    'views/xhrErrorView'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    AppLayout,
    HeaderView,
    NavPanelView,
    XhrErrorView) {

    /**
     * Create a composite application instance
     */
    var App = new Marionette.Application();


    /**
     * Add the main region, that will hold the page layout.
     */
    App.addRegions({
        regionMain: '#main'
    });

    /**
     * App Layout
     */
    App.layout = new AppLayout();


    /**
     * Startup Modules
     */
    App.addInitializer(function () {

        this.initAppLayout();

        // Start App Routers
        MsgBus.commands.execute('wine:routes');
        MsgBus.commands.execute('account:routes');
        MsgBus.commands.execute('dashboard:routes');
    });


    // The main initializing function sets up the basic layout and its regions.
    App.initAppLayout = function () {

        App.regionMain.show(App.layout);
        App.layout.appNavPanel.show(new NavPanelView());
    };


    /**
     * Register command 'xhr:error:handler'
     */
    MsgBus.commands.setHandler('xhr:error:handler', function (error) {

        if (error.type==='authorization') {

            // redirect to login
            Backbone.history.navigate('signin/redirect', {trigger: true});
        } else {

            // catch all xhr errors view
            var xhrErrorView = new XhrErrorView({error: error});
            MsgBus.commands.execute('popup:show', xhrErrorView);
        }
    });


    /**
     * Register command 'regions:load'
     * This command creates a new page and handles the JQM page transition
     */
    MsgBus.commands.setHandler('regions:load', function (regions) {

        App.layout.content.show(regions.content);
    });


    /**
     * Publish window resize event with dimensions of active page
     */
    App.triggerResizeEvent = function () {

        var width = $.mobile.activePage.outerWidth(true);
        MsgBus.events.trigger('window:resize', {width: width});
    };


    /**
     * Application Lifecycle Events
     */
    App.on('initialize:before', function () {
        // Fired before the initializers kick off
    });
    App.on('initialize:after', function () {
        // Start listening for hash changes after all initializers have finished
        if (Backbone.history) {

            Backbone.history.start();
        }
    });
    App.on('start', function () {
        // Fires after all initializers and after the initializer events
        console.log('Fires after all initializers and after the initializer events');
    });

    return App;
});

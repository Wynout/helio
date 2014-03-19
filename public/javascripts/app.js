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
    'views/NavBarView',
    'views/NavPanelView',
    'views/xhrErrorView',
    'mixins/backbone.routefilter'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    AppLayout,
    NavBarView,
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
    };


    /**
     * Register command 'regions:load'
     * This command creates a new page and handles the JQM page transition
     */
    MsgBus.commands.setHandler('regions:load', function (regions) {

        App.layout.content.show(regions.content);
    });


    /**
     * Register command 'xhr:error:handler'
     * @param {Object} error
     */
    MsgBus.commands.setHandler('xhr:error:handler', function (error) {

        if (error.type==='authorization') {

            // after sigin redirect to current fragment
            window.localStorage.setItem('signin/redirect', Backbone.history.fragment);
            Backbone.history.navigate('signin/redirect', {trigger: true});
        } else {

            // catch all xhr errors view
            var xhrErrorView = new XhrErrorView({error: error});
            MsgBus.commands.execute('modal:show', xhrErrorView);
        }
    });


    /**
     * Register command modal:show
     * @param {Object} view
     */
    MsgBus.commands.setHandler('modal:show', function (view) {

        App.layout.modal.show(view);
    });


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
        App.layout.navBar.show(new NavBarView());
        App.layout.appNavPanel.show(new NavPanelView());
    });
    App.on('start', function () {
        // Fires after all initializers and after the initializer events
        // console.log('Fires after all initializers and after the initializer events');
    });

    return App;
});

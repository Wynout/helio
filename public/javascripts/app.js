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
     * Containing Incoming and Outgoing jQuery Mobile pages
     */
    // App.views = {};

    // Add the main region, that will hold the page layout.
    App.addRegions({
        regionMain: '#main'
    });

    App.layout = new AppLayout();


    /**
     * Startup Modules
     */
    App.addInitializer(function () {

        this.initAppLayout();

        // Start App Routers
        MsgBus.commands.execute('wine:routes');
        MsgBus.commands.execute('account:routes');
    });


    // The main initializing function sets up the basic layout and its regions.
    App.initAppLayout = function () {

        // Inject the main layout into the #main region of the page.
        App.regionMain.show(App.layout);
    };


    /**
     * Register command 'xhr:error:show'
     * This command displays an error view to the user
     */
    MsgBus.commands.setHandler('xhr:error:show', function (error) {

        if (error.type==='authorization') {

            MsgBus.events.trigger('account:login');
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

        // todo: use extend to override default regions
        /*
        if (!regions.header) {

            regions.header = new HeaderView.standard();
        }
        if (!regions.navPanel) {

            regions.navPanel = new NavPanelView.standard();
        }*/
        console.log('regions:load', regions.content.el);
        App.layout.content.show(regions.content);


        // var pageLayout = new PageLayout(regions);
        // App.changePage(pageLayout);
    });


    /**
     * Based on the following example from Christophe Coenraets
     * @link http://coenraets.org/blog/2012/03/using-backbone-js-with-jquery-mobile/
     * The outgoing page is closed on JQM 'pagecontainerhide' event
     */
    App.changePage = function (view, transition) {

        // console.log('App.changePage', view);

        // App.views.outgoing = App.views.incoming;
        // App.views.incoming = view;

        // view.render();
        // $('.main').prepend(view.$el);

        // $.mobile.pageContainer.pagecontainer('change', view.$el, {
        //     changeHash: false,
        //     transition: transition || $.mobile.defaultPageTransition
        // });
    };


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


    /**
     * Start/Stop Sub Application
     */
    App.startSubApp = function (appName, args) {

        var currentApp = App.module(appName);
        if (App.currentApp === currentApp) {

            return;
        } else if (App.currentApp) {

            App.currentApp.stop();
        }

        App.currentApp = currentApp;
        currentApp.start(args);
    };


    return App;

});

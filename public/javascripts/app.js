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
    'layouts/PageLayout',
    'views/HeaderView',
    'views/NavPanelView',
    'views/xhrErrorView',
    'jquery.mobile-config',
    'jquery.mobile'],
function ($, Backbone, Marionette, MsgBus, PageLayout, HeaderView, NavPanelView, XhrErrorView) {

    /**
     * Create a composite application instance
     */
    var App = new Marionette.Application();


    /**
     * Containing Incoming and Outgoing jQuery Mobile pages
     */
    App.views = {};


    /**
     * Startup Modules
     */
    App.addInitializer(function () {

        this.initExtensions();
        this.initEvents();

        // Start App Routers
        MsgBus.commands.execute('wine:routes');
        MsgBus.commands.execute('account:routes');
    });


    App.initExtensions = function() {

        /**
         * Override Marionette onRender and onShow events so JQM 'create' event is
         * triggered on view's element.
         * This ensures dynamically created is given the jQuery Mobile treatment
         */
        // Marionette.View.prototype.onRender = Marionette.View.prototype.onShow = function () {
        //     this.$el.trigger('create');
        //     return this;
        // };
    };

    App.initEvents = function () {

        /**
         * Close Marionette.View when it's been replaced by JQM changePage.
         * Marionette handles removal of associated DOM structure and unbinding of events.
         */
        $(window.document).on('pagecontainerhide', function (event, ui) {

            if (App.views.outgoing) {

                App.views.outgoing.close();
            }
        });


        /**
         * Trigger window resize event after 100ms
         */
        $(window).resize(function () {

            clearTimeout(this.id);
            this.id = setTimeout(function () {

                App.triggerResizeEvent();
            }, 100);
        });


        /**
         * Trigger resize event to open/close panels on page has change
         */
        $(window.document).on('pagechange', function (event) {

            App.triggerResizeEvent();
        });


        // test login popup
        $(window.document).on('click', '.login-popup', function (event, ui) {

            MsgBus.events.trigger('account:login');
            return false;
        });
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
     * Register command 'change:page'
     * This command creates a new page and handles the JQM page transition
     */
    MsgBus.commands.setHandler('change:page', function (regions) {

        // todo: use extend to override default regions
        if (!regions.header) {

            regions.header = new HeaderView.default();
        }
        if (!regions.navPanel) {

            regions.navPanel = new NavPanelView.default();
        }
        var pageLayout = new PageLayout(regions);
        App.changePage(pageLayout);
    });


    /**
     * Based on the following example from Christophe Coenraets
     * @link http://coenraets.org/blog/2012/03/using-backbone-js-with-jquery-mobile/
     * The outgoing page is closed on JQM 'pagecontainerhide' event
     */
    App.changePage = function (view, transition) {

        App.views.outgoing = App.views.incoming;
        App.views.incoming = view;

        view.render();
        $('body').append(view.$el);

        $.mobile.pageContainer.pagecontainer('change', view.$el, {
            changeHash: false,
            transition: transition || $.mobile.defaultPageTransition
        });
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
            console.log('Backbone.history.start();');
            Backbone.history.start();
        }
    });
    App.on('start', function () {
        // Fires after all initializers and after the initializer events
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

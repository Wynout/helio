/*
|------------------------------------------------------------------------------
| Auth module sets access token in header                               auth.js
|------------------------------------------------------------------------------
*/
define(['backbone'], function (Backbone) {
    'use strict';

    /**
     * Store a version of Backbone.sync to call from the
     * modified version we create
     */
    var backboneSync = Backbone.sync;

    Backbone.sync = function (method, model, options) {

        /**
         * The jQuery `ajax` method includes a 'headers' option
         * which lets you set any headers you like
         */
        options.headers = {

            /**
             * Set the 'Authorization' header and get the access
             * token from the `auth` module
             */
            'Authorization': getToken()
        };


        /**
         * Call the stored original Backbone.sync method with
         * extra headers argument added
         */
        backboneSync(method, model, options);
    };

    function getToken() {

        var token = window.localStorage.getItem('token');
        return token!==null ? token : '';
    }
});
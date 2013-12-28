/*
    This is the require.js configuration
*/

require.config({
    urlArgs: "bust=" + (new Date()).getTime(),

    paths : {
        backbone : '../../backbone.marionette/backbone',
        underscore : '../../backbone.marionette/underscore',
        jquery : '../../backbone.marionette/jquery',
        marionette : '../../backbone.marionette/backbone.marionette',
        localstorage: '../../backbone.marionette/backbone.localstorage-min',
        bootstrap: '../../bootstrap/js/bootstrap.min',
        appFiles: '../../global/js/app-files',
        mainApp: 'app'
    },
    shim : {
        jquery : {
            exports : 'jQuery'
        },
        underscore : {
            exports : '_'
        },
        backbone : {
            deps : ['jquery', 'underscore'],
            exports : 'Backbone'
        },
        marionette : {
            deps : ['jquery', 'underscore', 'backbone'],
            exports : 'Marionette'
        },
        localstorage: {
            deps: ['backbone']
        },
        bootstrap:{
            deps: ["jquery"]
        }
    }
});

require(['mainApp', 'backbone', 'localstorage'], function(app, Backbone){
    /**
     * This runs once app.js has been loaded.
     */

    app.start();
});
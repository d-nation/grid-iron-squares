define( ["marionette", "reqres", "appFiles/collections/games", "settings/views/mainView"],
    function (Marionette, reqres, Games, SettingsView) {
    "use strict";

    // set up the app instance
    var Settings = new Marionette.Application();

    // configuration, setting up regions, etc ...
    Settings.addRegions({
        settingsArea: "#settings"
    });

    Settings.addInitializer(function(){
        Settings.games = new Games();
        Settings.games.fetch({
            success: function(data){
                if(!Settings.games.length){
                    Settings.games.create({});
                }
            }
        });

        reqres.setHandlers({
            "getGame": function(){
                return Settings.games.at(0);
            }
        });

        Settings.settingsArea.show(new SettingsView());

    });

    return Settings;
});
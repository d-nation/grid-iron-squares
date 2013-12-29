define( ["marionette", "reqres", "vent", "appFiles/collections/games", "settings/views/mainView"],
    function (Marionette, reqres, vent, Games, SettingsView) {
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

        Settings.listenTo(vent, "restartSettingsView", function(){
            Settings.settingsArea.close();
            Settings.settingsArea.show(new SettingsView());
        });

        Settings.settingsArea.show(new SettingsView());

    });

    return Settings;
});
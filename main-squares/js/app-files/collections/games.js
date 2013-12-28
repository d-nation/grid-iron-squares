define(['marionette', "localstorage", 'appFiles/models/game'],
    function (Marionette, LocalStorage, Game) {
        "use strict";

    return Backbone.Collection.extend({
		model: Game,

        localStorage: new Backbone.LocalStorage("games")
    });
});
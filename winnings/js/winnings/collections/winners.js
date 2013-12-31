define(['marionette', 'winnings/models/winner'],
    function (Marionette, Winner) {
        "use strict";

    return Backbone.Collection.extend({
		model: Winner,

        comparator: function(winner){
            return winner.get("quarter");
        }
    });
});
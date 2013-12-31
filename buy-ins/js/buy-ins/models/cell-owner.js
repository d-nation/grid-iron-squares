define(['marionette', "reqres"],
    function (Marionette, reqres) {
        "use strict";

    return Backbone.Model.extend({

        initialize: function(){
            this.set({"buyIn": this.get("squares") * reqres.request("getGame").get("settings")["pps"]});
        }

    });
});
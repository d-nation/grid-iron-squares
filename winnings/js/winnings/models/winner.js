define(['marionette', "reqres"],
    function (Marionette, reqres) {
        "use strict";

    return Backbone.Model.extend({

        initialize: function(){
            var pps = reqres.request("getGame").get("settings")["pps"],
                totalBuyIn = pps * 100,
                qtrShares = reqres.request("getGame").get("settings")["winningPercent"],
                thisQtr = parseInt(this.get("qtr")) - 1,
                thisWinningAmt = (qtrShares[thisQtr]/100) * totalBuyIn;

            this.set({
                "winnings": thisWinningAmt,
                "teamOne": reqres.request("getGame").get("teamOne")["name"],
                "teamTwo": reqres.request("getGame").get("teamTwo")["name"]
            });
        }

    });
});
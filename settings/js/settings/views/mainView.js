define(['marionette', 'reqres', 'settings/templates'],
    function (Marionette, reqres, templates) {
        "use strict";

    return Marionette.ItemView.extend({
        id: "settings-container",

        template: function(){
            return _.template(templates.main, reqres.request("getGame").get("settings"));
        },

        events: {
            "change #pps-input": "onSquarePriceChange",
            "change .quarter-percent-input": "onQuarterPercentChange"
        },

        ui: {
            percentWarnings: "#winning-percent-warnings"
        },

//		regions: {
//			grid: "#grid-container"
//		},

        initialize: function(){
            this.game = reqres.request("getGame");
            this.gameSettings = this.game.get("settings");
        },

		onRender: function(){
		},

        onDomRefresh: function(){
        },

        onSquarePriceChange: function(event){
            var $input = $(event.currentTarget),
                newPPS;

            //error checking
            try{
                newPPS = parseInt($input.val());
            }
            catch(e){
                alert("Square Price must be a number!");
            }

            //proceed if input is valid
            if(!isNaN(newPPS)){
                this.gameSettings["pps"] = newPPS;

                this.game.set("settings", this.gameSettings);
                this.game.save();
            }
            //reset if input isn't valid
            else{
                alert("Square Price must be a number!");

                $input.val(this.gameSettings["pps"]);
            }
        },

        onQuarterPercentChange: function(event){
            var $input = $(event.currentTarget),
                newPercent,
                winningPercent = this.gameSettings["winningPercent"];

            //error checking
            try{
                newPercent = parseInt($input.val());
            }
            catch(e){
                alert("Winning Percentage must be a number!");
            }

            //proceed if input is valid
            if(!isNaN(newPercent)){
                switch($input.attr("id")){
                    case "first-weight":
                        winningPercent[0] = newPercent;
                        break;
                    case "second-weight":
                        winningPercent[1] = newPercent;
                        break;
                    case "third-weight":
                        winningPercent[2] = newPercent;
                        break;
                    case "fourth-weight":
                        winningPercent[3] = newPercent;
                        break;
                    default:
                        break;
                }
                this.game.set("settings", this.gameSettings);
                this.game.save();
            }
            //reset if input isn't valid
            else{
                alert("Winning Percentage must be a number!");

                switch($input.attr("id")){
                    case "first-weight":
                        $input.val(winningPercent[0]);
                        break;
                    case "second-weight":
                        $input.val(winningPercent[1]);
                        break;
                    case "third-weight":
                        $input.val(winningPercent[2]);
                        break;
                    case "fourth-weight":
                        $input.val(winningPercent[3]);
                        break;
                    default:
                        break;
                }
            }

            //check if winnings >100%
            if(this.winningsTooBig(winningPercent)){
                this.toggleWarning(true);
            }
            else{
                this.toggleWarning(false);
            }
        },

        winningsTooBig: function(winningArray){
            var i, total = 0;

            for(i=0; i<winningArray.length; i+=1){
                total += winningArray[i];
            }

            return total > 100;
        },

        toggleWarning: function(show){
            if(show){
                this.ui.percentWarnings.show();
            }
            else{
                this.ui.percentWarnings.hide();
            }
        }
    });
});

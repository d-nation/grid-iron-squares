define(['marionette', 'reqres', 'vent', 'settings/templates', 'app-files/models/game'],
    function (Marionette, reqres, vent, templates, Game) {
        "use strict";

    return Marionette.ItemView.extend({
        id: "settings-container",

        template: function(){
            return _.template(templates.main, reqres.request("getGame").get("settings"));
        },

        events: {
            "change #pps-input": "onSquarePriceChange",
            "change .quarter-percent-input": "onQuarterPercentChange",
            "click #reset-btn": "onResetClick",
            "click #randomize-btn": "onRandomizeClick"
        },

        ui: {
            percentWarnings: "#winning-percent-warnings",
            resetBtn: "#reset-btn",
            randomizeBtn: "#randomize-btn"
        },

        initialize: function(){
            this.game = reqres.request("getGame");
            this.gameSettings = this.game.get("settings");
        },

		onRender: function(){
            if(this.gameSettings["isRandomized"]){
                this.$el.find("#randomize-btn").attr("disabled", "disabled");
                this.ui.randomizeBtn.attr("disabled", "disabled");
            }
		},

        onDomRefresh: function(){
        },

        onResetClick: function(){
            var reset = confirm("Resetting will clear the entire board. Are you sure you want to reset?");

            if(reset){
                this.game.set(this.game.defaults());
                this.game.save(this.game.attributes, {
                    success: function(){
                        vent.trigger("restartSettingsView");
                    }
                });
            }
        },

        onRandomizeClick: function(){
            var newCols = this.shuffleArray(["0", "2", "4", "6", "8", "9", "7", "5", "3", "1"]),
                newRows = this.shuffleArray(["9", "7", "5", "3", "1", "0", "2", "4", "6", "8"]),
                i, j, row, cell;

            //set the master columns list
            this.game.set("cols", newCols);

            //set the rows and the score of each cell in the row
            for(i=0; i<newRows.length; i+=1){
                row = this.game.get("rows")[i];

                //set the row's score
                row["score"] = newRows[i];

                for(j=0; j<newCols.length; j+=1){
                    cell = row["columns"][i];
                    cell["score"] = newCols[i];
                }
            }

            this.gameSettings["isRandomized"] = true;

            this.game.set("settings", this.gameSettings);
            this.game.save();

            this.$el.find("#randomize-btn").attr("disabled", "disabled");
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
        },

        shuffleArray: function(array) {
            var i, j, temp;
            for (i = array.length - 1; i > 0; i--) {
               j = Math.floor(Math.random() * (i + 1));
                temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
    });
});

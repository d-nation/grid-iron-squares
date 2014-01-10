define(['marionette', 'reqres', 'vent', 'scoreLine/templates'],
    function (Marionette, reqres, vent, templates) {
        "use strict";

    return Marionette.ItemView.extend({
    	className: "team-row",

		template: function(serialized_model){
			return _.template(templates.teamLine, serialized_model);
		},

		events: {
            "click .team-name": "onTeamNameClick",
            "click .score-cell": "onScoreCellClick",
            "keyup": "onKeyUp"
        },

        initialize: function(){
            this.game = reqres.request("getGame");

            this.listenTo(vent, "closeInputs", this.onCloseInputs);
        },

        onTeamNameClick: function(event){
            var $currentTarget = $(event.currentTarget);
            event.stopPropagation();

            if(!$currentTarget.children(".team-name-input").length){
                vent.trigger("closeInputs", false);
                $currentTarget.html("<input class='team-name-input' type='text' value='"+$currentTarget.html()+"' />");
                $currentTarget.children(".team-name-input").focus();
            }
        },

        onScoreCellClick: function(event){
            var $currentTarget = $(event.currentTarget);
            event.stopPropagation();

            if(!$currentTarget.children(".score-cell-input").length){
                vent.trigger("closeInputs");
                $currentTarget.html("<input class='score-cell-input input-mini' type='text' value='"+$currentTarget.html()+"' />");
                $currentTarget.children(".score-cell-input").focus();
            }
        },

        onCloseInputs: function(){
            var inputs = this.$el.find("input"),
                data = {},
                $input,
                thisView = this,
                isNum = false,
                parsedInput;

            _.each(inputs, function(input){
                $input = $(input);

                if($input.hasClass("team-name-input")){
                    $input.parent().html(thisView.model.get("name"));
                }
                else if($input.hasClass("score-cell-input")){
                    if($input.parent().hasClass("first")){
                        $input.parent().html(thisView.model.get("firstQuarter"));
                    }
                    else if($input.parent().hasClass("second")){
                        $input.parent().html(thisView.model.get("secondQuarter"));
                    }
                    else if($input.parent().hasClass("third")){
                        $input.parent().html(thisView.model.get("thirdQuarter"));
                    }
                    else if($input.parent().hasClass("fourth")){
                        $input.parent().html(thisView.model.get("fourthQuarter"));
                    }
                }

            });

        },

        onKeyUp: function(event){
            var $currentTarget = $(event.currentTarget),
                $input = this.$el.find("input"),
                data = {},
                isNum=false,
                parsedInput;

            if($input.hasClass("team-name-input")){
                this.model.set({"name": $input.val().trim()});
//                $input.parent().html(this.model.get("name"));
                vent.trigger("changeTeamName", this.$el.parent().attr("id"), this.model.get("name"))
            }
            else if($input.hasClass("score-cell-input")){
                //Make sure its a number
                try {
                    if($input.val().trim() === ""){
                        parsedInput = "";
                    }
                    else{
                        parsedInput = parseInt($input.val().trim());
                        isNum = ! isNaN(parsedInput);
                    }
                }
                catch(e){
                    alert("Score must be a number!");
                }

                //Proceed if input is a number
                if(isNum || parsedInput===""){
                    if($input.parent().hasClass("first")){
                        this.model.set({"firstQuarter": parsedInput});
//                        $input.parent().html(this.model.get("firstQuarter"));
                    }
                    else if($input.parent().hasClass("second")){
                        this.model.set({"secondQuarter": parsedInput});
//                        $input.parent().html(this.model.get("secondQuarter"));
                    }
                    else if($input.parent().hasClass("third")){
                        this.model.set({"thirdQuarter": parsedInput});
//                        $input.parent().html(this.model.get("thirdQuarter"));
                    }
                    else if($input.parent().hasClass("fourth")){
                        this.model.set({"fourthQuarter": parsedInput});
//                        $input.parent().html(this.model.get("fourthQuarter"));
                    }
                }

                //Back out if the input was not a number
                else{
                    alert("Score must be a number!");
                    $input.val("");
                }

            }
            data[this.options.teamNum] = this.model.attributes;
            this.game.set(data);
            this.game.save();
            vent.trigger("scoreChange");

            if(event.keyCode === 13){
                this.onCloseInputs();
            }
        }
    });
});
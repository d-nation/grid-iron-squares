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
                vent.trigger("closeInputs", false);
                $currentTarget.html("<input class='score-cell-input input-mini' type='text' value='"+$currentTarget.html()+"' />");
                $currentTarget.children(".score-cell-input").focus();
            }
        },

        onCloseInputs: function(keepInputs){
            var inputs = this.$el.find("input"),
                data = {},
                $input,
                thisView = this,
                isNum = false,
                parsedInput;

            _.each(inputs, function(input){
                $input = $(input);
                if(keepInputs){
                    if($input.hasClass("team-name-input")){
                        thisView.model.set({"name": $input.val()});
                        $input.parent().html(thisView.model.get("name"));
                        vent.trigger("changeTeamName", thisView.$el.parent().attr("id"), thisView.model.get("name"))
                    }
                    else if($input.hasClass("score-cell-input")){
                        //Make sure its a number
                        try {
                            parsedInput = parseInt($input.val());
                            isNum = ! isNaN(parsedInput);
                        }
                        catch(e){
                            alert("Score must be a number!");
                        }

                        //Proceed if input is a number
                        if(isNum){
                            if($input.parent().hasClass("first")){
                                thisView.model.set({"firstQuarter": parsedInput});
                                $input.parent().html(thisView.model.get("firstQuarter"));
                            }
                            else if($input.parent().hasClass("second")){
                                thisView.model.set({"secondQuarter": parsedInput});
                                $input.parent().html(thisView.model.get("secondQuarter"));
                            }
                            else if($input.parent().hasClass("third")){
                                thisView.model.set({"thirdQuarter": parsedInput});
                                $input.parent().html(thisView.model.get("thirdQuarter"));
                            }
                            else if($input.parent().hasClass("fourth")){
                                thisView.model.set({"fourthQuarter": parsedInput});
                                $input.parent().html(thisView.model.get("fourthQuarter"));
                            }
                        }

                        //Back out if the input was not a number
                        else{
                            alert("Score must be a number!");

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

                    }
                    data[thisView.options.teamNum] = thisView.model.attributes;
                    thisView.game.set(data);
                    thisView.game.save();
                    vent.trigger("scoreChange");
                }
                else{
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
                }
            });

        },

        onKeyUp: function(event){
            var $currentTarget = $(event.currentTarget);

            if(event.keyCode === 13){
                this.onCloseInputs(true);
            }
        }


        /*,

		onDomRefresh: function(){
			var parent = this.$el.parent().attr('id');

			if(parent === "team-two"){
				this.$el.addClass("bottom-team");
			}
		}*/
    });
});
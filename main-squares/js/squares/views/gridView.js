define(['marionette', 'reqres', 'vent','squares/templates'],
    function (Marionette, reqres, vent, templates) {
        "use strict";

    var rowView = Marionette.ItemView.extend({
    	tagName: "tr",

    	template: function(serialized_model){
            serialized_model["cols"] = reqres.request("getGame").get("cols");
			return _.template(templates.row, serialized_model);
		},

		events:{
			"click td": "onCellClick",
			"keyup": "onKeyUp"
		},

		initialize: function(){
            this.game = reqres.request("getGame");

			this.listenTo(vent, "closeInputs", this.onCloseInputs);
		},

		onRender: function(){
			var cols = this.model.get("columns"), 
			 	i;

			for(i=0; i<cols.length; i+=1){
				this.$el.find("[data-col-pos='"+i + "']").html(cols[i]["name"])
			}
		},

		onCellClick: function(event){
			var $currentTarget = $(event.currentTarget),
				teamOneScore = parseInt($currentTarget.attr("data-col")),
				teamTwoScore = parseInt($currentTarget.attr("data-row"));

			//TODO Start input sequence here
			vent.trigger("closeInputs", false);
			if(!$currentTarget.children(".name-input").length){
				$currentTarget.html("<input class='name-input' type='text' value='"+$currentTarget.html()+"' />");
				$currentTarget.children(".name-input").focus();
			}
		},

		onCloseInputs: function(keepInputs){
			var cells = this.$el.find("td"),
                data = {},
				currentColumn,
				$input,
				thisView = this;

			_.each(cells, function(cell){
				if($(cell).children(".name-input").length){
					$input = $(cell).children(".name-input");
					currentColumn = parseInt($input.parent().attr("data-col-pos"));
					
					if(keepInputs){
                        data["columns"] = thisView.model.get("columns");
						data["columns"][currentColumn]["name"] = $input.val();

						$(cell).html($(cell).children(".name-input")[0].value);

                        thisView.game.set(data);
                        thisView.game.save();
					}
					else{
						$(cell).html(thisView.model.get("columns")[currentColumn]["name"]);
					}
				}
			});
		},

		onKeyUp: function(event){
			var $currentTarget = $(event.currentTarget),
				cols = this.model.get("columns"),
				$input = this.$el.find(".name-input"),
				currentColumn;

			if(event.keyCode === 13){
				currentColumn = parseInt($input.parent().attr("data-col-pos"));

				this.model.get("columns")[currentColumn]["name"] = $input.val();
				
				this.onCloseInputs(true);
			}
		}
    });

    return Marionette.CompositeView.extend({
    	itemView: rowView,

		itemViewContainer: "#row-body",

		template: function(serialized_model){
			return _.template(templates.grid, reqres.request("getGame").attributes);
		}/*,

		onDomRefresh: function(){
			var parent = this.$el.parent().attr('id');

			if(parent === "team-two"){
				this.$el.addClass("bottom-team");
			}
		}*/
        ,
        onRender: function(){
            var winnerSquares = this.findWinners(),
                i,
                tempSquare;

            for(i=0; i<winnerSquares[0].length; i+=1){
                tempSquare = this.$el.find("td[data-col='" + winnerSquares[0][i] + "'][data-row='" + winnerSquares[1][i] + "']")

                if(tempSquare.length){
                    switch(i){
                        case 0:
                            tempSquare.addClass("first");
                            break;
                        case 1:
                            tempSquare.addClass("second");
                            break;
                        case 2:
                            tempSquare.addClass("third");
                            break;
                        case 3:
                            tempSquare.addClass("fourth");
                            break;
                        default:
                            break;
                    }
                }
            }
        },

        findWinners: function(){
            var game = reqres.request("getGame"),
                teamOne = game.get("teamOne"),
                teamTwo = game.get("teamTwo"),
                teamOneQtrScores = [],
                teamTwoQtrScores = [];

            //calculate team one scores (aka column numbers)
            teamOneQtrScores.push(this.calculateQuarterScore(teamOne["firstQuarter"]));
            teamOneQtrScores.push(this.calculateQuarterScore(teamOne["secondQuarter"]));
            teamOneQtrScores.push(this.calculateQuarterScore(teamOne["thirdQuarter"]));
            teamOneQtrScores.push(this.calculateQuarterScore(teamOne["fourthQuarter"]));

            //calculate team two scores (aka row numbers)
            teamTwoQtrScores.push(this.calculateQuarterScore(teamTwo["firstQuarter"]));
            teamTwoQtrScores.push(this.calculateQuarterScore(teamTwo["secondQuarter"]));
            teamTwoQtrScores.push(this.calculateQuarterScore(teamTwo["thirdQuarter"]));
            teamTwoQtrScores.push(this.calculateQuarterScore(teamTwo["fourthQuarter"]));

            return [teamOneQtrScores, teamTwoQtrScores];
        },

        calculateQuarterScore: function(score){
            var scoreString = "";

            score = "" + score;

            if(score.length){
                return parseInt(score.substring(score.length-1));
            }
            else{
                return scoreString;
            }
        }
    });
});
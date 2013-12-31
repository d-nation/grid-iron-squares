define( ["marionette", "reqres", "vent", "appFiles/collections/games", "winnings/views/mainView", 'winnings/collections/winners'],
    function (Marionette, reqres, vent, Games, WinningsView, Winners) {
    "use strict";

    // set up the app instance
    var Winnings = new Marionette.Application();

    // configuration, setting up regions, etc ...
    Winnings.addRegions({
        winnings: "#winnings"
    });

    Winnings.addInitializer(function(){
        Winnings.games = new Games();

        reqres.setHandlers({
            "getGame": function(){
                return Winnings.games.at(0);
            }
        });

        Winnings.games.fetch({
            success: function(data){
                var winnersCollection = [];

                if(!Winnings.games.length){
                    Winnings.games.create({});
                }

                winnersCollection = Winnings.composeCollection(reqres.request("getGame"));

                Winnings.winnings.show(new WinningsView({collection: winnersCollection}));
            }
        });

    });

    Winnings.composeCollection = function(game){
        var rows = game.get("rows"),
            columns,
            tempWinners = {},
            qtrScores = Winnings.findQtrScores(game),
            i;

        //find the winners

        //iterate thru the quarters
        for(i=0; i<qtrScores[0].length; i+=1){
            if(qtrScores[0][i] && qtrScores[1][i]){
                //find the row for this quarter
                _.each(rows, function(row){
                    //only procede if the row matches the score for the qtr
                    if(row["score"] === qtrScores[1][i]){
                        columns = row["columns"];

                        //find the column for this quarter
                        _.each(columns, function(cell){
                            var owner = cell["name"],
                                qtr = i + "";

                            //only proceed if the column matches the score for the qtr
                            if(cell["score"] === qtrScores[0][i]){

                                //mark the owner as a winner
                                if(owner){
                                    if(tempWinners.hasOwnProperty(i)){
                                        tempWinners[qtr]["squares"] += 1;
                                    }
                                    else{
                                        tempWinners[qtr] = {qtr: i+1, name: owner, col: qtrScores[0][i], row: qtrScores[1][i]};
                                    }
                                }
                            }

                        });
                    }

                });
            }

        }

        tempWinners = _.map(tempWinners, function(value, key){return value;});

        return new Winners(tempWinners);
    };

    Winnings.findQtrScores = function(game){
        var teamOne = game.get("teamOne"),
            teamTwo = game.get("teamTwo"),
            teamOneQtrScores = [],
            teamTwoQtrScores = [];

        //calculate team one scores (aka column numbers)
        teamOneQtrScores.push(Winnings.calculateQuarterScore(teamOne["firstQuarter"]));
        teamOneQtrScores.push(Winnings.calculateQuarterScore(teamOne["secondQuarter"]));
        teamOneQtrScores.push(Winnings.calculateQuarterScore(teamOne["thirdQuarter"]));
        teamOneQtrScores.push(Winnings.calculateQuarterScore(teamOne["fourthQuarter"]));

        //calculate team two scores (aka row numbers)
        teamTwoQtrScores.push(Winnings.calculateQuarterScore(teamTwo["firstQuarter"]));
        teamTwoQtrScores.push(Winnings.calculateQuarterScore(teamTwo["secondQuarter"]));
        teamTwoQtrScores.push(Winnings.calculateQuarterScore(teamTwo["thirdQuarter"]));
        teamTwoQtrScores.push(Winnings.calculateQuarterScore(teamTwo["fourthQuarter"]));

        return [teamOneQtrScores, teamTwoQtrScores];
    };

    Winnings.calculateQuarterScore = function(score){
        var scoreString = "";

        score = "" + score;

        if(score.length){
            return score.substring(score.length-1);
        }
        else{
            return scoreString;
        }
    };

    return Winnings;
});
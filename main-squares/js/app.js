define( ["marionette", "reqres", "appFiles/collections/games", "scoreLine/views/mainView", "squares/views/mainView"],
    function (Marionette, reqres, Games, ScoreLineView, SquaresView) {
    "use strict";

    // set up the app instance
    var Squares = new Marionette.Application();

    // configuration, setting up regions, etc ...
    Squares.addRegions({
        scoreLine: "#score-line",
        squares: '#squares-container'
    });

    Squares.addInitializer(function(){
        Squares.games = new Games();
        Squares.games.fetch({
            success: function(data){
                if(!Squares.games.length){
                    Squares.games.create({});
                }

            }
        });

        reqres.setHandlers({
            "getGame": function(){
                return Squares.games.at(0);
            }
        });

        Squares.scoreLine.show(new ScoreLineView());
        Squares.squares.show(new SquaresView());

    });

    return Squares;
});
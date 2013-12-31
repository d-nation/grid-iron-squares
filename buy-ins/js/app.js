define( ["marionette", "reqres", "vent", "appFiles/collections/games", "buy-ins/views/mainView", 'buy-ins/collections/cell-owners'],
    function (Marionette, reqres, vent, Games, BuyInsView, CellOwners) {
    "use strict";

    // set up the app instance
    var BuyIns = new Marionette.Application();

    // configuration, setting up regions, etc ...
    BuyIns.addRegions({
        buyIns: "#buy-ins"
    });

    BuyIns.addInitializer(function(){
        BuyIns.games = new Games();

        reqres.setHandlers({
            "getGame": function(){
                return BuyIns.games.at(0);
            }
        });

        BuyIns.games.fetch({
            success: function(data){
                if(!BuyIns.games.length){
                    BuyIns.games.create({});
                }



                BuyIns.buyIns.show(new BuyInsView({collection: BuyIns.composeCollection(reqres.request("getGame"))}));
            }
        });

    });

    BuyIns.composeCollection = function(game){
        var rows, columns,
            tempOwners = {};

        rows = game.get("rows");

        _.each(rows, function(row){
            columns = row["columns"];

            _.each(columns, function(cell){
                var owner = cell["name"];
                if(owner){
                    if(tempOwners.hasOwnProperty(owner)){
                        tempOwners[owner]["squares"] += 1;
                    }
                    else{
                        tempOwners[owner] = {name: owner, squares: 1};
                    }
                }
            });
        });

        tempOwners = _.map(tempOwners, function(value, key){return value;});

        return new CellOwners(tempOwners);
    };

    return BuyIns;
});
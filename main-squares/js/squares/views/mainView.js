define(['marionette', 'reqres', 'vent', 'squares/templates', 'squares/models/team', 'squares/collections/rows', 'squares/views/gridView'],
    function (Marionette, reqres, vent, templates, Team, Rows, GridView) {
        "use strict";

    return Marionette.Layout.extend({
    	id: "grid-area",
		template: _.template(templates.main),

		regions: {
			grid: "#grid-container"
		},

        initialize: function(){
            this.game = reqres.request("getGame");

            this.listenTo(vent, "changeTeamName", this.onChangeTeamName);
        },

		onRender: function(){
			this.$el.find("#team-label-top").html(this.game.get("teamOne")["name"]);
			this.$el.find("#team-label-left").html(this.game.get("teamTwo")["name"]);

			this.grid.show(new GridView({collection: new Rows(this.game.get("rows"))}));
		},

        onChangeTeamName: function(team, name){
            if(team === "team-one"){
                this.$el.find("#team-label-top").html(name);
            }
            else{
                this.$el.find("#team-label-left").html(name);
            }


        }
    });
});

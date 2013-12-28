define(['marionette', 'reqres', 'scoreLine/templates', 'scoreLine/models/team', 'scoreLine/views/teamLineView'],
    function (Marionette, reqres, templates, Team, TeamLineView) {
        "use strict";

    return Marionette.Layout.extend({
		template: _.template(templates.main),

		regions: {
			teamOne: "#team-one",
			teamTwo: "#team-two"
		},

        initialize: function(){
            this.game = reqres.request("getGame");
        },

		onRender: function(){
			var model1 = new Team(this.game.get("teamOne")),
				model2 = new Team(this.game.get("teamTwo"));

			this.teamOne.show(new TeamLineView({model: model1, teamNum: "teamOne"}));
			this.teamTwo.show(new TeamLineView({model: model2, teamNum: "teamTwo"}));
		}
    });
});

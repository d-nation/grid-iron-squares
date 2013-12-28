define(['marionette'],
    function (Marionette, templates) {
        "use strict";

    return Backbone.Model.extend({
		default: function(){
			return {
				name: "Team"
			};
		}
    });
});
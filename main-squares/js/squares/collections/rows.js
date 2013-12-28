define(['marionette', 'squares/models/row'],
    function (Marionette, Row) {
        "use strict";

    return Backbone.Collection.extend({
		model: Row
    });
});
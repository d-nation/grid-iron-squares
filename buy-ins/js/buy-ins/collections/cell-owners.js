define(['marionette', 'buy-ins/models/cell-owner'],
    function (Marionette, CellOwner) {
        "use strict";

    return Backbone.Collection.extend({
		model: CellOwner,

        comparator: function(owner){
            return owner.get("name");
        }
    });
});
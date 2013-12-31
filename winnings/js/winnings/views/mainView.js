define(['marionette', 'reqres', 'vent', 'winnings/templates', 'winnings/collections/winners'],
    function (Marionette, reqres, vent, templates, Winners) {
        "use strict";

    var rowView = Marionette.ItemView.extend({
        tagName: "tr",

        className: "danger",

        template: function(serialized_model){
            return _.template(templates.row, serialized_model);
        },

        ui: {
            paidIcon: ".glyphicon"
        },

        events: {
            "click .winnings-paid": "onPaidToggle"
        },

        initialize: function(){
            this.game = reqres.request("getGame");
            this.paidList = this.game.get("paidOut");
        },

        onRender: function(){
            if(this.findModelInPaidList()){
                this.$el.removeClass("danger").addClass("success");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-down").addClass("glyphicon-thumbs-up");
            }
        },

        onPaidToggle: function(){
            if(! this.findModelInPaidList()){
                this.paidList[this.model.get("qtr")] = true;
                this.$el.removeClass("danger").addClass("success");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-down").addClass("glyphicon-thumbs-up");

                this.game.set("paidOut", this.paidList);
                this.game.save();
            }
            else{
                delete this.paidList[this.model.get("qtr")];
                this.$el.removeClass("success").addClass("danger");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-up").addClass("glyphicon-thumbs-down");

                this.game.set("paidOut", this.paidList);
                this.game.save();
            }
        },

        findModelInPaidList: function(){
            return this.paidList.hasOwnProperty(this.model.get("qtr"));
        }
    });

    return Marionette.CompositeView.extend({
        id: "winnings-table",

        itemView: rowView,

        itemViewContainer: "#row-body",

        tagName: "table",

        className: "table",

        template: _.template(templates.main),

        initialize: function(){
            var i, rows, columns,
                thisView = this,
                tempOwners = {};
            this.game = reqres.request("getGame");
            this.gameSettings = this.game.get("settings");






//            this.collection = new CellOwners(tempOwners);
        },

		onRender: function(){
		}
    });
});

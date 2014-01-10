define(['marionette', 'reqres', 'vent', 'buy-ins/templates', 'buy-ins/collections/cell-owners'],
    function (Marionette, reqres, vent, templates, CellOwners) {
        "use strict";

    var rowView = Marionette.ItemView.extend({
        tagName: "tr",

        className: "buy-in-row danger",

        template: function(serialized_model){
            return _.template(templates.row, serialized_model);
        },

        ui: {
            paidIcon: ".glyphicon"
        },

        events: {
            "click": "onPaidToggle"
        },

        initialize: function(){
            this.game = reqres.request("getGame");
            this.paidList = this.game.get("paidIn");
        },

        onRender: function(){
            if(this.findModelInPaidList()){
                this.$el.removeClass("danger").addClass("success");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-down").addClass("glyphicon-thumbs-up");
            }
        },

        onPaidToggle: function(event){
            event.stopPropagation();
            if(! this.findModelInPaidList()){
                this.paidList[this.model.get("name")] = true;
                this.$el.removeClass("danger").addClass("success");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-down").addClass("glyphicon-thumbs-up");

                this.game.set("paidIn", this.paidList);
                this.game.save();
            }
            else{
                delete this.paidList[this.model.get("name")];

                this.$el.removeClass("success").addClass("danger");
                this.ui.paidIcon.removeClass("glyphicon-thumbs-up").addClass("glyphicon-thumbs-down");

                this.game.set("paidIn", this.paidList);
                this.game.save();
            }
        },

        findModelInPaidList: function(){
            return this.paidList.hasOwnProperty(this.model.get("name"));
        }
    });

    return Marionette.CompositeView.extend({
        id: "buy-ins-table",

        itemView: rowView,

        itemViewContainer: "#row-body",

        tagName: "table",

        className: "table",

        template: _.template(templates.main),

        initialize: function(){
            this.game = reqres.request("getGame");
            this.gameSettings = this.game.get("settings");
        }
    });
});

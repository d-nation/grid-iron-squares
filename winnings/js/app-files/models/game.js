define(['marionette'],
    function (Marionette) {
        "use strict";

    return Backbone.Model.extend({
		defaults: function(){
			return {
				teamOne: {
                    name: "Team One",
                    firstQuarter: "",
                    secondQuarter: "",
                    thirdQuarter: "",
                    fourthQuarter: ""
                },
                teamTwo: {
                    name: "Team Two",
                    firstQuarter: "",
                    secondQuarter: "",
                    thirdQuarter: "",
                    fourthQuarter: ""
                },
                settings: {

                },
                cols: [
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#",
                    "#"
                ],
                rows: [
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"},
                            {name: "", score: "#"}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""}
                        ]
                    },
                    {
                        score: '#',
                        columns: [
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""},
                            {name: ""}
                        ]
                    }
                ]
			};
		}
    });
});
define(['marionette'],
    function (Marionette) {
        "use strict";

    return Backbone.Model.extend({
		defaults: function(){
			return {
                version: "0.1",
				teamOne: {
                    name: "Away Team",
                    firstQuarter: "",
                    secondQuarter: "",
                    thirdQuarter: "",
                    fourthQuarter: ""
                },
                teamTwo: {
                    name: "Home Team",
                    firstQuarter: "",
                    secondQuarter: "",
                    thirdQuarter: "",
                    fourthQuarter: ""
                },
                settings: {
                    pps: "5",
                    winningPercent: [25,25,25,25],
                    isRandomized: false
                },
                paidIn: {},
                paidOut: {},
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
                        pos: 0,
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
                        pos: 1,
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
                        pos: 2,
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
                        pos: 3,
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
                        pos: 4,
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
                        pos: 5,
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
                        pos: 6,
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
                        pos: 7,
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
                        pos: 8,
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
                        pos: 9,
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
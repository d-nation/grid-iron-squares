define(function(require){
    "use strict";

    var mainTemplate =
        '<div class="score-line-labels">\
            <div class="team-name-label">Name</div>\
            <div class="team-score-box-container">\
                <table class="table table-condensed label-table">\
                    <tbody>\
                        <tr>\
                            <td class="quarter">1st</td>\
                            <td class="quarter">2nd</td>\
                            <td class="quarter">3rd</td>\
                            <td class="quarter">4th</td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
        </div>\
        <div id="team-one">\
        </div>\
    	<div id="team-two">\
        </div>',

    teamLineTemplate =
        '<div class="team-name"><%= name %></div>\
        <div class="team-score-box-container">\
            <table class="table table-bordered">\
                <tbody>\
                    <tr>\
                        <td class="first quarter score-cell"><%= firstQuarter %></td>\
                        <td class="second quarter score-cell"><%= secondQuarter %></td>\
                        <td class="third quarter score-cell"><%= thirdQuarter %></td>\
                        <td class="fourth quarter score-cell"><%= fourthQuarter %></td>\
                    </tr>\
                </tbody>\
            </table>\
        </div>';

    return {
        main 		: mainTemplate,
        teamLine    : teamLineTemplate
    };
});
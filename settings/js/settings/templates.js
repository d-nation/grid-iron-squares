define(function(require){
    "use strict";

    var mainTemplate =
        '<form class="form-horizontal" role="form">\
            <span id="save-help" class="help-block">Changes are saved automatically.</span>\
            <div class="form-group">\
                <label for="pps-input" class="col-xs-offset-3 col-sm-offset-4 col-xs-3 col-sm-2 control-label">Square Price</label>\
                <div class="col-xs-3 col-sm-2">\
                    <input type="number" id="pps-input" class="form-control" value="<%= pps %>">\
                </div>\
            </div>\
        </form>\
        <form class="form-horizontal" role="form">\
            <div class="form-group">\
                <label for="" class="col-xs-offset-5 col-sm-offset-6 col-xs-3 col-sm-2 control-label">Winning %</label>\
                <div class="col-xs-3 col-sm-2"></div>\
            </div>\
            <div class="form-group">\
                <label for="pps-input" class="col-xs-offset-3 col-sm-offset-4 col-xs-3 col-sm-2 control-label">1st Quarter</label>\
                <div class="col-xs-3 col-sm-2">\
                    <input type="number" id="first-weight" class="form-control quarter-percent-input" value="<%= winningPercent[0] %>">\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="pps-input" class="col-xs-offset-3 col-sm-offset-4 col-xs-3 col-sm-2 control-label">2nd Quarter</label>\
                <div class="col-xs-3 col-sm-2">\
                    <input type="number" id="second-weight" class="form-control quarter-percent-input" value="<%= winningPercent[1] %>">\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="pps-input" class="col-xs-offset-3 col-sm-offset-4 col-xs-3 col-sm-2 control-label">3rd Quarter</label>\
                <div class="col-xs-3 col-sm-2">\
                    <input type="number" id="third-weight" class="form-control quarter-percent-input" value="<%= winningPercent[2] %>">\
                </div>\
            </div>\
            <div class="form-group">\
                <label for="fourth-weight" class="col-xs-offset-3 col-sm-offset-4 col-xs-3 col-sm-2 control-label">4th Quarter</label>\
                <div class="col-xs-3 col-sm-2">\
                    <input type="number" id="fourth-weight" class="form-control quarter-percent-input" value="<%= winningPercent[3] %>">\
                </div>\
            </div>\
            <div id="winning-percent-warnings" class="col-xs-offset-3 col-sm-offset-4 col-xs-6 col-sm-4 alert alert-danger" style="display: none">Winnings total more than 100%</div>\
        </form>\
        <div class="navbar-fixed-bottom">\
            <button type="button" class="btn btn-primary btn-lg btn-block">Randomize Grid</button>\
            <button type="button" class="btn btn-danger btn-lg btn-block">Reset Game</button>\
        </div>',

    gridTemplate = 
        '<table class="table">\
            <thead>\
                <tr>\
                    <th class="zero-zero"></th>\
                    <th class="th-0"><%= cols[0] %></th>\
                    <th class="th-1"><%= cols[1] %></th>\
                    <th class="th-2"><%= cols[2] %></th>\
                    <th class="th-3"><%= cols[3] %></th>\
                    <th class="th-4"><%= cols[4] %></th>\
                    <th class="th-5"><%= cols[5] %></th>\
                    <th class="th-6"><%= cols[6] %></th>\
                    <th class="th-7"><%= cols[7] %></th>\
                    <th class="th-8"><%= cols[8] %></th>\
                    <th class="th-9"><%= cols[9] %></th>\
                </tr>\
            </thead>\
            <tbody id="row-body">\
            </tbody>\
        </table>',

        rowTemplate = 
            '<th data-row="<%= score %>"><%= score %></th>\
            <td data-row="<%= score %>" data-col="<%= cols[0] %>" data-col-pos="0"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[1] %>" data-col-pos="1"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[2] %>" data-col-pos="2"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[3] %>" data-col-pos="3"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[4] %>" data-col-pos="4"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[5] %>" data-col-pos="5"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[6] %>" data-col-pos="6"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[7] %>" data-col-pos="7"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[8] %>" data-col-pos="8"></td>\
            <td data-row="<%= score %>" data-col="<%= cols[9] %>" data-col-pos="9"></td>';

    return {
        main 		: mainTemplate,
        grid        : gridTemplate,
        row         : rowTemplate
    };
});
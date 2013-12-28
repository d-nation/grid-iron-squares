define(function(require){
    "use strict";

    var mainTemplate =
        '<div id="team-label-top"></div>\
        <div id="label-grid-row">\
            <div id="team-label-left-container"><div id="team-label-left"></div></div>\
            <div id="grid-container"></div>\
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
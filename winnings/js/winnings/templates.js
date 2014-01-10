define(function(require){
    "use strict";

    var mainTemplate =
        '<thead>\
            <tr>\
                <th>Qtr</th>\
                <th>Name</th>\
                <th class="winnings-cell">Won</th>\
                <th class="winnings-paid">Paid</th>\
            </tr>\
        </thead>\
        <tbody id="row-body"></tbody>',

        rowTemplate = 
            '<td class="winnings-qtr"><%= qtr %></td>\
            <td class="owner-name"><%= name %></td>\
            <td class="winnings-cell">$<%= winnings %></td>\
            <td class="winnings-paid"><i class="glyphicon glyphicon-thumbs-down"></i></td>';

    return {
        main 		: mainTemplate,
        row         : rowTemplate
    };
});
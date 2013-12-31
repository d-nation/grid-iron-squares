define(function(require){
    "use strict";

    var mainTemplate =
        '<thead>\
        <tr>\
        <th>Name</th>\
        <th class="buy-in-squares">Squares</th>\
        <th class="buy-in-cell">Buy In</th>\
        <th class="buy-in-paid">Paid</th>\
        </tr>\
        </thead>\
        <tbody id="row-body"></tbody>',

        rowTemplate = 
            '<td class="owner-name"><%= name %></td>\
            <td class="buy-in-squares"><%= squares %></td>\
            <td class="buy-in-cell">$<%= buyIn %></td>\
            <td class="buy-in-paid"><i class="glyphicon glyphicon-thumbs-down"></i></td>';

    return {
        main 		: mainTemplate,
        row         : rowTemplate
    };
});
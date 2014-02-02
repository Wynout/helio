/*
|---------------------------------------------------------------------------------
| Wine List View                                 app/scripts/views/WineListView.js
|---------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'views/PaginatorView',
    'views/WineListItemView',
], function ($, Backbone, PaginatorView, WineListItemView) {

    'use strict';

    var WineListView = Backbone.View.extend({

        initialize: function (options) {

            this.options = options;
            this.render();
        },

        render: function () {

            var wines    = this.model.models,
                len      = wines.length,
                startPos = (this.options.page - 1) * 8,
                endPos   = Math.min(startPos + 8, len);

            $(this.el).html('<ul class="thumbnails"></ul>');

            for (var i = startPos; i < endPos; i++) {

                $('.thumbnails', this.el)
                    .append(new WineListItemView({model: wines[i]}).render().el);
            }

            $(this.el)
                .append(new PaginatorView({model: this.model, page: this.options.page}).render().el);

            return this;
        }
    });

    return WineListView;
});
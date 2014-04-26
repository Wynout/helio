/*
|---------------------------------------------------------------------------------
| Resource List View                         app/scripts/views/ResourceListView.js
|---------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'views/PaginatorView',
    'views/ResourceListItemView',
], function ($, Backbone, PaginatorView, ResourceListItemView) {

    'use strict';

    var ResourceListView = Backbone.View.extend({

        initialize: function (options) {

            this.options = options;
            this.render();
        },

        render: function () {

            var resources = this.model.models,
                len       = resources.length,
                startPos  = (this.options.page - 1) * 8,
                endPos    = Math.min(startPos + 8, len);

            $(this.el).html('<ul class="thumbnails"></ul>');

            for (var i = startPos; i < endPos; i++) {

                $('.thumbnails', this.el)
                    .append(new ResourceListItemView({model: resources[i]}).render().el);
            }

            $(this.el)
                .append(new PaginatorView({model: this.model, page: this.options.page}).render().el);

            return this;
        }
    });

    return ResourceListView;
});
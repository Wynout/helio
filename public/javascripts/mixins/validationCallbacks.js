/*
|------------------------------------------------------------------------------
| Extending Backbone.Validation Callbacks           views/backboneValidation.js
|
| "Object Extension Is A Poor Man’s Mixin"
| @link http://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
|
| Extending Backbone.validation callbacks
| @link @link https://gist.github.com/driehle/2909552
|------------------------------------------------------------------------------
*/
define(['underscore', 'jquery', 'backbone', 'backbone.validation'], function (_, $, Backbone) {

    _.extend(Backbone.Validation.callbacks, {

        valid: function (view, attr, selector) {

            var $input = view.$('[' + selector + '=' + attr + ']'),
                $label = view.$('[for=' + $input.attr('id') + ']');

            $input.closest('div').removeClass('ui-input-required');
            $label.find('.validation-error-message').remove();
        },

        invalid: function (view, attr, error, selector) {

            var $input = view.$('[' + selector + '=' + attr + ']'),
                $label = view.$('[for=' + $input.attr('id') + ']'),
                $span;

            $input.closest('div').addClass('ui-input-required');

            if ($label.find('.validation-error-message').length===0) {

                $span = $('<span></span>', {class: 'validation-error-message', text: error});
                $label.append($span);
            }
        }
    });

});
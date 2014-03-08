/*
|------------------------------------------------------------------------------
| Extending Backbone.Validation                     views/backboneValidation.js
|
| "Object Extension Is A Poor Man’s Mixin"
| @link http://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
|------------------------------------------------------------------------------
*/
define(['underscore', 'jquery', 'backbone', 'backbone.validation'], function (_, $, Backbone) {

    /**
     * Override default error messages
     * {0} formatted name, {1} allowed value or first in range, {2} second in range
     */
    _.extend(Backbone.Validation.messages, {
        required      : '{0} is required',
        acceptance    : '{0} must be accepted',
        min           : '{0} must be greater than or equal to {1}',
        max           : '{0} must be less than or equal to {1}',
        range         : '{0} must be between {1} and {2}',
        length        : '{0} must be {1} characters',
        minLength     : '{0} must be at least {1} characters',
        maxLength     : '{0} must be at most {1} characters',
        rangeLength   : '{0} must be between {1} and {2} characters',
        oneOf         : '{0} must be one of: {1}',
        equalTo       : '{0} must be the same as {1}',
        digits        : '{0} must only contain digits',
        number        : '{0} must be a number',
        email         : '{0} must be a valid email',
        url           : '{0} must be a valid url',
        inlinePattern : '{0} is invalid',
    });


    /**
     * Overriding default validation callbacks
     */
    _.extend(Backbone.Validation.callbacks, {

        valid: function (view, attr, selector) {

            var $input = view.$('[' + selector + '=' + attr + ']'),
                $label = view.$('[for=' + $input.attr('id') + ']'),
                $wrapper;

            // textarea does not have wrapper div
            if ($input.is('textarea')) {

                $wrapper = $input;
            } else {

                $wrapper = $input.closest('div');
            }

            $wrapper.removeClass('validation-input-invalid');
            $label.find('.validation-error-message').remove();
        },

        invalid: function (view, attr, error, selector) {

            var $input = view.$('[' + selector + '=' + attr + ']'),
                $label = view.$('[for=' + $input.attr('id') + ']'),
                $span,
                $wrapper;

            // textarea does not have wrapper div
            if ($input.is('textarea')) {

                $wrapper = $input;
            } else {

                $wrapper = $input.closest('div');
            }

            $wrapper.addClass('validation-input-invalid');

            if ($label.find('.validation-error-message').length===0) {

                $span = $('<span></span>', {'class': 'validation-error-message', text: error});
                $label.append($span);
            }
        }
    });


    /**
     * Overriding or define custom validation patterns
     */
    // _.extend(Backbone.Validation.patterns, {
    //     myPattern: /my-pattern/,
    //     email: /my-much-better-email-regex/
    // });

});

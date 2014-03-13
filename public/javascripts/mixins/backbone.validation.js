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
        valid: function(view, attr, selector) {

            var control, group;

            control = view.$('[' + selector + '=' + attr + ']');
            group = control.parents('.form-group');
            group.removeClass('has-error');

            if (control.data('error-style') === 'tooltip') {

                if (control.data('tooltip')) {

                    return control.tooltip('hide');
                }
            } else if (control.data('error-style') === 'inline') {

                return group.find('.help-inline.error-message').remove();
            } else {

                return group.find('.help-block.error-message').remove();
            }
        },

        invalid: function (view, attr, error, selector) {

            var control, group, position, target;
            control = view.$('[' + selector + '=' + attr + ']');
            group   = control.parents('.form-group');
            group.addClass('has-error');

            if (control.data('error-style') === 'tooltip') {

                position = control.data('tooltip-position') || 'right';
                control.tooltip({
                    placement: position,
                    trigger: 'manual',
                    title: error
                });
                return control.tooltip('show');

            } else if (control.data('error-style') === 'inline') {

                if (group.find('.help-inline').length === 0) {

                    group.find('.form-control')
                        .after('<span class=\'help-inline error-message\'></span>');
                }
                target = group.find('.help-inline');
                return target.text(error);
            } else {

                if (group.find('.help-block').length === 0) {

                    group.find('.form-control')
                        .after('<p class=\'help-block error-message\'></p>');
                }
                target = group.find('.help-block');
                return target.text(error);
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

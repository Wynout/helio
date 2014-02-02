/*
|------------------------------------------------------------------------------
| Extending Validation Callbacks                                 views/_base.js
|------------------------------------------------------------------------------
*/
// @link https://gist.github.com/driehle/2909552
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
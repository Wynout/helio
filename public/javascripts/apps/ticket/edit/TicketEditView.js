/*
|------------------------------------------------------------------------------
| Ticket Edit View                                            TicketEditView.js
|------------------------------------------------------------------------------
*/
define([
    'jquery',
    'backbone',
    'marionette',
    'msgbus',
    'hbs!apps/ticket/edit/TicketEditTemplate',
    'hbs!apps/ticket/edit/TicketEditSuccessTemplate',
    'hbs!apps/ticket/edit/TicketEditErrorTemplate',
    'i18n!nls/ticket',
    'i18n!nls/validation',
    'backbone.stickit',
    'mixins/backbone.validation'],
function (
    $,
    Backbone,
    Marionette,
    MsgBus,
    ticketEditTemplate,
    ticketEditSuccessTemplate,
    ticketEditErrorTemplate,
    nlsTicket,
    nlsValidation) {

    /**
     * Message shown when ticket successfully saved
     */
    var SuccessView = Marionette.ItemView.extend({
        template: ticketEditSuccessTemplate,

        serializeData: function () {

            return {
                saved: nlsTicket.saved
            };
        },

        onShow: function () {

            this.$el.delay(1500).fadeOut(300);
        }
    });


    /**
     * Message shown when ticket could not be saved
     */
    var ErrorView = Marionette.ItemView.extend({
        template: ticketEditErrorTemplate,

        serializeData: function () {

            return {
                errors: this.options.errors,
                invalid: nlsValidation.invalid
            };
        }
    });


    /**
     * Ticket Edit Layout View
     */
    var TicketEditView = Marionette.Layout.extend({
        template: ticketEditTemplate,

        regions: {
            alertSuccess : '#alert-success-region',
            alertError   : '#alert-error-region'
        },

        events: {
            'change'                : 'change',
            'click .save'           : 'saveTicket',
            'click .delete-confirm' : 'deleteTicketConfirm'
        },

        /**
         * Use stickit to perform binding between the model and the view
         */
        bindings: {
            '#ticket-title': {
                observe: 'title',
                setOptions: {
                    validate: true
                }
            },
            '#ticket-description': {
                observe: 'description',
                setOptions: {
                    validate: true
                }
            }
        },

        initialize: function () {

            var self = this;

            // Hook up the validation
            // forceUpdate: Since we are automatically updating the model, we want the model to also hold invalid values, otherwise, we might be validating something else than the user has entered in the form.
            Backbone.Validation.bind(this, {forceUpdate: true});
            this.model.on('validated:invalid', function (model, errors) {

                self.showError(errors);
            });
            this.model.on('validated:valid', function (model) {

               self.hideError();
            });
        },

        serializeData: function () {

            return $.extend(
                this.model.toJSON(),
                nlsTicket.edit
            );
        },

        enableLiveValidation: function () {

            this.stickit();
        },

        // Called by the region, after the region has added the view to the dom
        onShow: function () {

            if (this.model.get('_id')) {

                this.enableLiveValidation();
            }
        },

        // Called when the view has been closed.
        onClose: function () {

            Backbone.Validation.unbind(this);
        },

        // Called when edit form has changed
        change: function (event) {

            // Apply the change from edit form to the model
            var target = event.target,
                change = {};
            change[target.name] = target.value;
            this.model.set(change);
        },

        saveTicket: function () {

            if (!this.model.isValid(true)) { // true forces a validation before the result is returned

                this.enableLiveValidation();
                return false;
            }

            var self       = this,
                saveTicket = MsgBus.reqres.request('ticket:entity:save', this.model);
            saveTicket
                .done(function () {

                    self.showSuccess();
                })
                .fail(function (error, model, jqXHR, options) {

                    MsgBus.commands.execute('xhr:error:handler', error);
                });

            return false;
        },

        deleteTicketConfirm: function (event) {

            event.preventDefault();
            MsgBus.events.trigger('ticket:delete:confirm', this.model);
            return false;
        },

        showSuccess: function () {

            var $save = this.$el.find('button.save');
            $save.addClass('btn-success');
            setTimeout(function () {

                $save.removeClass('btn-success');
            }, 1500);
            this.alertSuccess.show(new SuccessView());
        },

        showError: function (errors) {

            this.alertError.show(new ErrorView({errors: errors}));
        },

        hideError: function () {

            this.alertError.close();
        }
    });

    return TicketEditView;
});

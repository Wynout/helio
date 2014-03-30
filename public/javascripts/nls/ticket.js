define({
    root: {
        validation: {
            invalid: {
                title: 'You must enter a title',
                description: 'You must enter a description'
            }
        },
        edit: {
            labels: {
                id: 'Id',
                type: 'Type',
                title: 'Title',
                description: 'Description'
            },
            placeholders: {
                id: 'id',
                type: 'Ticket type',
                title: 'Title of ticket',
                description: 'Ticket description'
            },
            buttons: {
                save: 'Save',
                'delete': 'Delete'
            }
        },
        saved: {
            title: 'Success',
            message: 'Ticket saved successfully'
        },
        'delete': {
            modal: {
                title: 'Delete Ticket?',
                message: 'This action cannot be undone.'
            },
            buttons: {
                'delete': 'Delete',
                cancel: 'Cancel'
            }
        }
    },
    'nl-nl': true
});

define({
    root: {
        validation: {
            invalid: {
                title: 'You must enter a title',
                description: 'You must enter a description'
            }
        },
        list: {
            headings: {
                all: 'All tickets',
                active: 'Active tickets',
                completed: 'Completed tickets'
            },
            placeholders: {
                create: 'What needs to be done?'
            },
            mark: {
                'new': 'Mark as new',
                active: 'Mark as active',
                completed: 'Mark as completed'
            },
            count: {
                singular: 'item left',
                plurar: 'items left'
            },
            filters: {
                all: 'All',
                active: 'Active',
                completed: 'Completed'
            },
            buttons: {
                clearCompleted: 'Clear completed ({0})'
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
                create: 'Create',
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

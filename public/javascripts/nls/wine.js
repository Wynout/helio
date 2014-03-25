define({
    root: {
        validation: {
            invalid: {
                name: 'You must enter a name',
                grapes: 'You must enter a grape variety',
                country: 'You must enter a country',
                region: 'You must enter a region',
                year: 'You must enter a production year between 2007 and 2013',
                description: 'You must enter a description'
            }
        },
        edit: {
            labels: {
                id: 'Id',
                name: 'Name',
                grapes: 'Grapes',
                country: 'Country',
                region: 'Region',
                year: 'Year',
                description: 'Description'
            },
            placeholders: {
                id: 'id',
                name: 'Name of wine',
                grapes: 'Grape variety',
                country: 'Country of production',
                region: 'Region of production',
                year: 'Year of production',
                description: 'Wine description'
            },
            buttons: {
                save: 'Save',
                'delete': 'Delete'
            }
        },
        saved: {
            title: 'Success',
            message: 'Wine saved successfully'
        },
        'delete': {
            modal: {
                title: 'Delete Wine?',
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

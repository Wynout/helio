define({
    validation: {
        invalid: {
            title: 'U moet een titel',
            description: 'U moet een omschrijving invoeren'
        }
    },
    list: {
        headings: {
            all: 'Alle bonnen',
            active: 'Actieve bonnen',
            completed: 'Voltooide bonnen'
        },
        placeholders: {
            create: 'Wat moet er gebeuren?'
        },
        state: {
            'new': 'Markeer als nieuw',
            active: 'Markeer als actief',
            completed: 'Markeer als voltooid'
        },
        count: {
            singular: 'bon resterend',
            plurar: 'bonnen resterend'
        },
        filters: {
            all: 'Alles',
            active: 'Actief',
            completed: 'Voltooid'
        },
        buttons: {
            clearCompleted: 'Voltooide bonnen wissen ({0})'
        }
    },
    edit: {
        labels: {
            id: 'Id',
            state: 'Toestand',
            type: 'Type',
            title: 'Titel',
            description: 'Omschrijving'
        },
        placeholders: {
            id: 'id',
            type: 'Ticket type',
            title: 'Title van de ticket',
            description: 'Ticket omschrijving'
        },
        selects: {
            state: {
                'new': 'Nieuw',
                active: 'Actief',
                completed: 'Voltooid'
            }
        },
        buttons: {
            create: 'Aanmaken',
            save: 'Opslaan',
            'delete': 'Verwijder'
        }
    },
    saved: {
        title: 'Succes',
        message: 'Ticket succesvol opgeslagen'
    },
    'delete': {
        modal: {
            title: 'Ticket verwijderen?',
            message: 'Deze actie kan niet ongedaan worden gemaakt.'
        },
        buttons: {
            'delete': 'Verwijder',
            cancel: 'Annuleer'
        }
    }
});

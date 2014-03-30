define({
    modal: {
        title: 'Foutmelding',
        close: 'Sluit'
    },
    xhrErrorTypes: {
        'unknown': 'Onbekende fout',
        'authentication': 'Authenticatie fout',
        'retrieval': 'Ophaal fout',
        'validation': 'Validatiefout'
    },
    xhrErrorMessages: {
        // authentication
        'username is required': 'Gebruikersnaam is verplicht',
        'password is required': 'Wachtwoord is verplicht',
        'user not found': 'Gebruiker niet gevonden',
        'invalid password': 'Ongeldig wachtwoord',
        // token
        'authorization sign key missing': 'Autorisatie sleutel mist',
        'bad syntax': 'Slechte syntax',
        'unauthorized access': 'Ongeautoriseerde toegang',
        'authorization expired': 'Autorisatie is verlopen',
        // other
        'not found': 'Niet gevonden',
        'validation failed': 'Validatie is mislukt'
    }
});

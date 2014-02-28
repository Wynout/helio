define({
    validation: {
        invalid: {
            username: 'U moet een gebruikersnaam invullen',
            name: 'U moet uw naam invullen',
            password: 'Wachtwoord moet minimaal bestaan uit 8 tekens',
            repeatPassword: 'De wachtwoorden komen niet overeen',
            emailRequired: 'U moet een E-mailadres invullen',
            emailInvalid: 'U moet een geldig E-mailadres invullen',
            termsOfUse: 'De gebruiksrechtovereenkomst moet worden geaccepteerd'
        }
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
        // wines
        'not found': 'Niet gevonden'
    }
});

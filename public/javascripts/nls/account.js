define({
    root: {
        validation: {
            invalid: {
                username: 'You must enter an username',
                name: 'You must enter a name',
                password: 'Password must be at least 8 characters',
                repeatPassword: 'The passwords does not match',
                emailRequired: 'You must enter an email address',
                emailInvalid: 'You must enter a valid email',
                termsOfUse: 'Terms of use must be accepted'
            }
        },
        login: {
            login: {
                header: 'Login',
                message: 'Please enter your login credentials'
            },
            labels: {
                username: 'Username',
                password: 'Password'
            },
            placeholders: {
                username: 'Enter username',
                password: 'Enter password'
            },
            buttons: {
                cancel: 'Cancel',
                switchUser: 'Switch user',
                login: 'Login'
            },
            'switch': {
                header: 'Switch Account'
            },
            error: {
                header: 'Login failure'
            }
        },
        signup: {
            headers: {
                signup: 'Signup'
            },
            labels: {
                username: 'Username',
                name: 'Name',
                email: 'Email',
                password: 'Password',
                repeatPassword: 'Repeat password',
                touAgree: 'I agree to the',
                tou: 'terms of use'
            },
            placeholders: {
                username: 'Enter your desired username',
                name: 'Enter your name',
                email: 'Enter your email address',
                password: 'Enter a password',
                repeatPassword: 'Repeat password'
            },
            buttons: {
                signup: 'Signup',
                cancel: 'Cancel'
            }
        }
    },
    'nl-nl': true
});

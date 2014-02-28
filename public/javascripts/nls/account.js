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
        xhrErrorMessages: {
            // authentication
            'username is required': 'Username is required',
            'password is required': 'Password is required',
            'user not found': 'User not found',
            'invalid password': 'Invalid password',
            // token
            'authorization sign key missing': 'Authorization sign key missing',
            'bad syntax': 'Bad syntax',
            'unauthorized access': 'Unauthorized access',
            'authorization expired': 'Authorization expired',
            // wines
            'not found': 'Not found'
        }
    },
    'nl-nl': true
});

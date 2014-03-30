define({
    root: {
        modal: {
            title: 'Error',
            close: 'Close'
        },
        xhrErrorTypes: {
            'unknown': 'Unknown error',
            'authentication': 'Authentication error',
            'retrieval': 'Retrieval error',
            'validation': 'Validation error'
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
            // other
            'not found': 'Not found',
            'validation failed': 'Validation failed'
        }
    },
    'nl-nl': true
});

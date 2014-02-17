var path = require('path');

module.exports = {
    bumblebee: {
        protocol: 'http',
        host: 'localhost',
        port: 9210,
        name: 'test server'
    },
    logger: {
        adapters: [{
            type: 'console',
            application: 'bumblebee',
            machine: 'test server'
        }]
    },
    grasshopper: {
        'auth': {
            username: 'admin',
            password: 'TestPassword'
        },
        'crypto': {
            'secret_passphrase' : '223fdsaad-ffc8-4acb-9c9d-1fdaf824af8c'
        },
        'db': {
            'type': 'mongodb',
            'host': 'mongodb://localhost:27017/test',
            'database': 'test',
            'username': '',
            'password': '',
            'debug': false
        }
    }
};
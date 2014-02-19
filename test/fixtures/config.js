var path = require('path');

module.exports = {
    bumblebee: {
        keys: {
            public: 'eb6ee390-ae43-4977-960f-2df31d98ae83',
            private: '210cc45f-04de-4363-a1ad-23b492ee3543'
        },
        port: 9210,
        local: {
            protocol: 'http',
            host: 'localhost',
            name: 'test server'
        },
        remote: {
            protocol: 'http',
            host: 'localhost',
            name: 'test server'
        }
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
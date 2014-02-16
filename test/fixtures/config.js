var path = require('path');

module.exports = {
    client: {
        protocol: 'http',
        host: 'domainname',
        port: 9210,
        name: 'test server'
    },
    server: {
        protocol: 'http',
        host: 'domainname',
        port: 9211,
        name: 'test server'
    },
    logger: {
        adapters: [{
            type: 'console',
            application: 'bumblebee',
            machine: 'test server'
        }]
    }
};
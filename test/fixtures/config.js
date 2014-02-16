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
            type: 'file',
            path: path.resolve(__dirname, '../../') + '/logs/std.out.log',
            application: 'bumblebee',
            machine: 'test server'
        },{
            type: 'console',
            application: 'bumblebee',
            machine: 'test server'
        }]
    }
};
var Client = function(){
    'use strict';

    var service = require('../bridgetown'),
        config = require('../config'),
        logger = require('solid-logger-js').init(config.logger),
        PORT = process.env.PORT || config.client.port;

    service.post('/payload', function(){
        console.log('test');
    });

    service.listen(PORT);
    logger.info('Client service listening on port ' + PORT + '...');
};

module.exports = Client;
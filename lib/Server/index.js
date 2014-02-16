var Server = function(config){
    'use strict';

    var service = require('../bridgetown'),
        config = require('../config'),
        logger = require('solid-logger-js').init(config.logger),
        PORT = process.env.PORT || config.server.port;


    service.listen(PORT);
    logger.info('Listening on port ' + PORT + '...');
};

module.exports = Server;
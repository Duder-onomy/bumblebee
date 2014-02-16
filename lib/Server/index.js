var Server = function(){
    'use strict';

    var service = require('../bridgetown'),

        _ = require('underscore'),
        config = require('../config'),
        grasshopper = require('grasshopper-core'),
        logger = require('solid-logger-js').init(config.logger),
        PORT = process.env.PORT || config.server.port;


    service.post('/payload', function(httpRequest, httpResponse, next){
        var payload = httpRequest.body,
            repo = payload.repository.url,
            branch = _.last(payload.ref.split('/'));

        //Perform a query to grasshopper to see if there are any clients that need to do anything with it
        grasshopper.request(config.grasshopper.token).content.query({
            filters: [],
            options: {},
            nodes: [],
            types: []
        }).then(
            function(p){
                console.log(p);
            },
            function(err){
                logger.warn(err);
            }
        ).done(next);

        //Create the client payload for the commit
        //send post request to all clients that are setup

    });

    service.listen(PORT);
    logger.info('Listening on port ' + PORT + '...');
};

module.exports = Server;
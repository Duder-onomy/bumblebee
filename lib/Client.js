var Client = function(service){
    'use strict';

    var config = require('./config'),
        middleware = require('bridgetown-api').middleware,
        Response = require('bridgetown-api').Response;

    service.get('/worker/build', [
        middleware.authorization,
        middleware.apiKey,
        function(httpRequest, httpResponse){
            var response = new Response(httpResponse);
            response.writeSuccess({});
        }]);


    service.get('/worker/ping', [
        middleware.authorization,
        middleware.apiKey,
        function(httpRequest, httpResponse) {
            var response = new Response(httpResponse);
            response.writeSuccess({});
        }
    ]);
};

module.exports = Client;
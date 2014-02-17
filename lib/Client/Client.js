var Client = function(service){
    'use strict';

    service.get('/publish', function(httpRequest, httpResponse, next){
        console.log('client service notified');
        next();
    });


};

module.exports = Client;
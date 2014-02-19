var Client = function(service){
    'use strict';

    var config = require('./config'),
        request = require('superagent');

    function identityYourself(){

    }

    service.get('/worker/build', function(httpRequest, httpResponse, next){
        console.log('client service notified');
        next();
    });


};

module.exports = Client;
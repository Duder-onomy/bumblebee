module.exports = (function(){
    "use strict";

    var token = {},
        q = require('q'),
        jwt = require('jsonwebtoken'),
        _ = require('underscore'),
        config = require('./config'),
        createError = require('./error');

    /**
     * Make a jwt token that can be sent back with all requests.
     * @param payload
     * @returns {*}
     */
    token.make = function(payload){
        return new Buffer(jwt.sign(payload, config.bumblebee.keys.private)).toString('base64');
    };

    /**
     * This function is used by bridgetown so it expects a promise to be returned.
     * @param token
     * @returns {promise|Q.promise}
     */
    token.validate = function(token){
        var deferred = q.defer();

        jwt.verify(token, config.bumblebee.keys.private, function(err, decoded) {
            if(_.isObject(decoded)){
                deferred.resolve(decoded);
            }
            else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    };

    /**
     * Method used by bridgetown api to validate if the request coming in was generated from a queen bee that is
     * setup to have the same API key. All of the bees need to have matching API keys and secrets in order to work.
     * @param apikey
     * @returns {adapter.deferred.promise|*|promise|Q.promise}
     */
    token.validateApiKey = function(apikey){
        var deferred = q.defer();
        if(apikey === config.bumblebee.keys.public){
            deferred.resolve(true);
        }
        else {
            deferred.reject(createError(401));
        }

        return deferred.promise;
    };

    return token;
})();
var bridgetown = (function(){
    'use strict';

    var express = require('express'),
        bridgetown = require('bridgetown-api'),
        app = express();

    app.configure( function () {
        app.use(function(req, res, next) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            return next();
        });
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        bridgetown.configure(function(){
            //this.validate.token(tokens.validate);
        });
    });

    return app;

})();

module.exports = bridgetown;
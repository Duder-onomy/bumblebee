var util = require('util'),
    EventEmitter = require('events').EventEmitter;

/**
 * The bumblebee module returns constructable object that will setup the server and provide some convenience methods
 * to interact with the server. At it's simplest bumblebee is a rest api that listens for changes to a git repo. It is
 * really smart because all of the worker bees talk to their queen. This makes the system kind of living and able to
 * scale and grow, while maintaining a central place for managing data.
 * @param config
 * @constructor
 */
var bumblebee = function(config){
    'use strict';

    var _ = require('underscore'),
        grasshopper = require('grasshopper-core'),
        express = require('express'),
        bridgetown = require('bridgetown-api'),
        logger = require('solid-logger-js'),
        conf = require('./config'),
        Client = require('./Client'),
        Server = require('./Server'),
        client = null,
        server = null,
        app = express(),
        self = this,
        PORT = process.env.PORT || config.bumblebee.port;

    conf.init(config);
    logger.init(config.logger);

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

    grasshopper.configure(function(){
        this.config = config.grasshopper;
    });

    grasshopper.auth(
            config.grasshopper.auth.username,
            config.grasshopper.auth.password
        ).then(
        function(payload){
            conf.grasshopper.token = payload;
            self.emit('connected');
        },
        function(err){
            self.emit('error', err);
        }
    ).done();


    this.createWorker = function(){
        if(_.isNull(client)){
            client = new Client(app);
        }
        return client;
    };

    this.createQueen = function(){
        if(_.isNull(client)){
            server = new Server(app);
        }
        return server;
    };

    app.listen(PORT);
    logger.info('Client service listening on port ' + PORT + '...');
};

util.inherits(bumblebee, EventEmitter);

module.exports = bumblebee;
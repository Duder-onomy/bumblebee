var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var bumblebee = function(config){
    'use strict';

    var _ = require('underscore'),
        grasshopper = require('grasshopper-core'),
        conf = require('./config'),
        Client = require('./Client'),
        Server = require('./Server'),
        client = null,
        server = null,
        self = this;

    conf.init(config);

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
            client = new Client();
        }
        return client;
    };

    this.createQueen = function(){
        if(_.isNull(client)){
            server = new Server();
        }
        return server;
    };
};

util.inherits(bumblebee, EventEmitter);

module.exports = bumblebee;
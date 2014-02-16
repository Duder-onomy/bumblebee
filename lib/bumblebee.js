module.exports = function bumblebee(config){
    'use strict';

    var _ = require('underscore'),
        conf = require('./config'),
        Client = require('./Client'),
        Server = require('./Server'),
        client = null,
        server = null;

    conf.init(config);

    return {
        client: function(){
            if(_.isNull(client)){
                client = new Client();
            }
            return client;
        },
        server: function(){
            if(_.isNull(client)){
                server = new Server();
            }
            return server;
        }
    };
};
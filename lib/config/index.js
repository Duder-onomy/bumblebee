module.exports = (function(){
    'use strict';

    var conf = {
        client: {},
        server: {},
        logger : {}
    };

    conf.init = function(conf){
        this.logger = conf.logger;
        this.client = conf.client;
        this.server = conf.server;
    };

    return conf;
})();


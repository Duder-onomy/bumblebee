module.exports = (function(){
    'use strict';

    var conf = {
        client: {},
        server: {},
        logger : {},
        grasshopper: {
            token: ''
        }
    };

    conf.init = function(conf){
        this.logger = conf.logger;
        this.client = conf.client;
        this.server = conf.server;
    };

    return conf;
})();


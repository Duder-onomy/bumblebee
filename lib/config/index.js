module.exports = (function(){
    'use strict';

    var _ = require('underscore'),
        conf = {
        client: {},
        server: {},
        logger : {},
        bumblebee: {
            keys: {
                public: '',
                private: ''
            }
        },
        grasshopper: {
            token: ''
        }
    };

    conf.init = function(conf){
        this.logger = conf.logger;
        this.client = conf.client;
        this.server = conf.server;
        this.bumblebee = conf.bumblebee;
    };

    return conf;
})();


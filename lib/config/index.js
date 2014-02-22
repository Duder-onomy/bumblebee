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
            token: '',
            workerNodeId: '5301352ba937337206000010',
            workerTypeId: '530133be230f86700600000e'
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


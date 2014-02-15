module.exports = (function(){
    'use strict';

    var conf = {
        logger : {}
    };

    conf.init = function(conf){
        this.logger = conf.logger;
    };

    return conf;
})();


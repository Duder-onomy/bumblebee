var Server = function(service){
    'use strict';

    var q = require('q'),
        _ = require('underscore'),
        async = require('async'),
        request = require('superagent'),
        grasshopper = require('grasshopper-core'),
        config = require('../config'),
        logger = require('solid-logger-js').init(config.logger),
        workerBeeContentType = '530133be230f86700600000e';

    function getWorkerBee(repo, branch){
        var deferred = q.defer();

        grasshopper.request(config.grasshopper.token).content.query({
                filters: [{
                    key: 'fields.repositoryurl',
                    cmp: '=',
                    value: repo
                },{
                    key: 'fields.repositorybranch',
                    cmp: '=',
                    value: branch
                }],
                options: {},
                types: [workerBeeContentType]
            }).then(
                function(results){
                    deferred.resolve(results);
                },
                function(err){
                    deferred.reject(err);
                }
            ).done();

        return deferred.promise;
    }

    function notifyWorker(worker, next){
        var url = worker.fields.workerurl + '/publish';
        logger.info('Worker bee "' + worker.fields.title + '" has been notified to pull latest code at "' + worker.fields.workerurl + '." for branch "' + worker.fields.repositorybranch +  '"');

        request
            .post(url)
            .send({})
            .set('Accept', 'application/json')
            .end(function(error, res){
                if(res.error){
                    logger.error(res.error);
                }

                next();
            });
    }

    service.post('/notify', function(httpRequest, httpResponse, next){
        var payload = httpRequest.body,
            repo = payload.repository.url,
            branch = _.last(payload.ref.split('/'));

        getWorkerBee(repo, branch).then(
            function(results){
                if(results.length > 0){
                    logger.info('Queen bee notified of new package for "' + repo + '" on branch "' + branch + '"');

                    async.each(results, notifyWorker, function(err){
                       if(err){
                           logger.error(err);
                       }
                       next();
                    });
                }
                else {
                    next();
                }
            },
            function(err){
                logger.error(err);
                next(err);
            }
        ).done();
    });
};

module.exports = Server;
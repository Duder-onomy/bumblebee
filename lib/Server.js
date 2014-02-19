/**
 * The server module returns a constructable object that expects an express "app" as an argument. The server, or "Queen"
 * is responsible for receiving notifications from the git server and publishing out notifications to all of the
 * clients or "Worker Bees." Every time a push is made to the repository we check if a worker bee is setup for the
 * repo and branch being worked on.
 * @param service Express application
 * @constructor
 */
var Server = function(service){
    'use strict';

    var q = require('q'),
        _ = require('underscore'),
        async = require('async'),
        request = require('superagent'),
        grasshopper = require('grasshopper-core'),
        config = require('./config'),
        logger = require('solid-logger-js').init(config.logger),
        workerBeeContentType = '530133be230f86700600000e';

    /**
     * Function to query the grasshopper DMS and see if there is a worker bee setup with the specified repo and branch.
     * @param repo
     * @param branch
     * @returns {adapter.deferred.promise|*|promise|Q.promise}
     */
    function getWorkerBee(repo, branch){
        return grasshopper.request(config.grasshopper.token).content.query({
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
            });
    }

    /**
     * Function is responsible for notifying the specified worker.
     * @param worker Content object that includes the details about the worker bee
     * @param next
     */
    function notifyWorker(worker, next){
        var url = worker.fields.workerurl + '/worker/build';
        logger.info('Worker bee "' + worker.fields.title + '" has been notified to pull latest code at "' + worker.fields.workerurl + '." for branch "' + worker.fields.repositorybranch +  '"');

/*
        request
            .post(url)
            .send({})
            .set('Accept', 'application/json')
            .end(function(error, res){
                if(res.error){
                    logger.error(res.error);
                }

                next();
            });*/
    }


    /**
     * Express route that is called whenever a web hook is initiated. It will be the list of workers in the DMS
     * and then notify each one.
     */
    service.post('/queen/build', function(httpRequest, httpResponse, next){
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
                //[TODO] Log error to content object
                next();
            }
        ).done(
            function(){
                httpResponse.send('Completed');
            });
    });
};

module.exports = Server;
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
        Response = require('bridgetown-api').Response,
        middleware = require('bridgetown-api').middleware,
        createError = require('./error'),
        worker = require('./worker'),
        token = require('./token'),
        config = require('./config'),
        logger = require('solid-logger-js');

    /**
     * Function is responsible for notifying the specified worker.
     * @param worker Content object that includes the details about the worker bee
     * @param next
     */
    function notifyWorker(worker, next){
        var url = worker.fields.workerurl + '/worker/build';
        logger.info('Worker bee "' + worker.fields.title + '" has been notified to pull latest code at "' + worker.fields.workerurl + '." for branch "' + worker.fields.repositorybranch +  '"');

        request
            .get(url)
            .set('Accept', 'application/json')
            .set('authorization', 'Token ' + token.make(worker))
            .set('X-API-KEY', config.bumblebee.keys.public)
            .end(function(error, res){
                if(res.error){
                    logger.error(res.error);
                }

                next();
            });
    }


    /**
     * Express route that is called whenever a web hook is initiated. It will be the list of workers in the DMS
     * and then notify each one.
     */
    service.post('/queen/build', function(httpRequest, httpResponse){
        var payload = httpRequest.body,
            repo = payload.repository.url,
            branch = _.last(payload.ref.split('/')),
            response = new Response(httpResponse);

        worker.getByRepository(repo, branch).then(
            function(results){
                if(results.length > 0){
                    logger.info('Queen bee notified of new package for "' + repo + '" on branch "' + branch + '"');

                    async.each(results, notifyWorker, function(err){
                       if(err){
                           logger.error(err);
                       }
                    });
                }
                else {
                }
            },
            function(err){
                logger.error(err);
                //[TODO] Log error to content object
            }
        ).done(
            function(){
                response.writeSuccess("success");
            });
    });

    /**
     * Route that will listen for new worker bees that want to enlist in your hive.
     *
     * This route requires an authorization token encoded as a jwt with the following information:
     * {
     *      "name": "name of your cluster",
     *      "machineKey": "unique id of your server",
     *      "description": "This is my description for this machine.",
     *      "url": "http://localhost:9210"
     *  }
     */
    service.get('/queen/enlist', [
        middleware.authorization,
        middleware.apiKey,
        middleware.authToken,
        function(httpRequest, httpResponse){
            var response = new Response(httpResponse),
                identity = httpRequest.bridgetown.identity;
            response.writeFromPromise(worker.enlist(identity));
        }
    ]);
};

module.exports = Server;
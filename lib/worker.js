/**
 * The worker module is a utility to lookup data in the grasshopper DMS about worker bees. It will also save new
 * workers to the system when they 'enlist'
 */
module.exports = (function(){
    'use strict';

    var worker = {},
        grasshopper = require('grasshopper-core'),
        q = require('q'),
        config = require('./config');

    /**
     * Internal function to create a worker in the Grasshopper DMS
     * @param payload
     * @returns {*}
     */
    function createWorker(payload){
        var identifier = payload.name + ':' + payload.machineKey,
            content = {
                label: identifier,
                slug: identifier.replace(/ /g, ''),
                type: config.grasshopper.workerTypeId,
                status: "Live",
                node : {_id: config.grasshopper.workerNodeId, displayOrder: 1},
                fields: {
                    identifier: identifier,
                    description: payload.description,
                    url: payload.url,
                    logs: ['[' + new Date() + '] Worker enlisted']
                }
            };

        return grasshopper.request(config.grasshopper.token).content.insert(content);
    }

    /**
     * Function that will return a worker bee by it's unique identifier
     * @param identifier
     * @returns {*}
     */
    worker.getByIdentifier = function(identifier){
        return grasshopper.request(config.grasshopper.token).content.query({
            filters: [{
                key: 'fields.identifier',
                cmp: '=',
                value: identifier
            }],
            options: {},
            types: [config.grasshopper.workerTypeId]
        });
    };

    /**
     * Function to query the grasshopper DMS and see if there is a worker bee setup with the specified repo and branch.
     * @param repository
     * @param branch
     * @returns {adapter.deferred.promise|*|promise|Q.promise}
     */
    worker.getByRepository = function(repository, branch){
        return grasshopper.request(config.grasshopper.token).content.query({
            filters: [{
                key: 'fields.repositoryurl',
                cmp: '=',
                value: repository
            },{
                key: 'fields.repositorybranch',
                cmp: '=',
                value: branch
            }],
            options: {},
            types: [config.grasshopper.workerTypeId]
        });
    };

    /**
     * Function that will check grasshopper and see if a worker is in the system. If it is new to the system then
     * it will register it as a worker.
     * @param obj worker payload
     * @returns {adapter.deferred.promise|*|promise|Q.promise}
     */
    worker.enlist = function(obj){
        var deferred = q.defer();
        function handleResults(results){
            if(results.length === 0){
                createWorker(obj).then(deferred.resolve).fail(deferred.reject).done();
            }
            else {
                deferred.resolve();
            }
        }

        worker.getByIdentifier(obj.name + ':' + obj.machineKey).then(handleResults).done();
        return deferred.promise;
    };


    return worker;
})();
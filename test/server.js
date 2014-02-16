var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - client', function(){
    describe('setup the client and test for a connection', function() {
        var config = require('./fixtures/config'),
            bumblebee = new require('../lib/bumblebee')(config),
            payload = require('./fixtures/clientPayload');

        bumblebee.server();


        it('should return 401 because trying to access unauthenticated', function(done) {
            done();
        });
    });
});

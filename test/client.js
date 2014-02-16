var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - client', function(){
    describe('setup the client and test for a connection', function() {
        var config = require('./fixtures/config');
        var bumblebee = new require('../lib/bumblebee')(config);


        it('should return 401 because trying to access unauthenticated', function(done) {
            console.log(bumblebee);
            console.log(bumblebee.client());
            done();
        });
    });
});

var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - client', function(){
    describe('setup the client and test for a connection', function() {
        var config = require('./fixtures/config');
        var bumblebee = new require('../lib/bumblebee')(config);

        bumblebee.client();


        it('should return 401 because trying to access unauthenticated', function(done) {
            request('http://localhost:9210')
                .post('/payload')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .end(function(err, res) {
                    if (err) { throw err; }
                    done();
                });
        });
    });
});

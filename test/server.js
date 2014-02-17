var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - server (queen)', function(){
    'use strict';

    var config = require('./fixtures/config'),
        Bumblebee = require('../lib/bumblebee'),
        bumblebee = new Bumblebee(config),
        payload = require('./fixtures/serverPayload');


    before(function(done){
        bumblebee.createQueen();
        bumblebee.on('connected', function(){
            done();
        });
    });

    describe('setup the client and test for a connection', function() {
        it('server should receive a web hook and send back a success status', function(done) {
            request('http://localhost:9210')
                .post('/notify')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    done();
                });
        });
    });
});

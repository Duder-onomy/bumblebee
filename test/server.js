var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - server (queen)', function(){
    'use strict';

    var config = require('./fixtures/config'),
        token = require('../lib/token'),
        Bumblebee = require('../lib/bumblebee'),
        bumblebee = new Bumblebee(config),
        payload = require('./fixtures/serverPayload');


    before(function(done){
        bumblebee.start();
        bumblebee.on('connected', function(){
            done();
        });
    });

    after(function(done){
        bumblebee.stop();
        done();
    });

    describe('setup the client and test for a connection', function() {
        it('server should receive a web hook and send back a success status', function(done) {
            request('http://localhost:9210')
                .post('/queen/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(200);
                    done();
                });
        });

        it('server should receive an enlistment request and register it in grasshopper', function(done) {


            var payload = {
                    "name": "special server",
                    "machineKey": "myuniquekey",
                    "description": "This is my description for this machine.",
                    "url": "http://localhost:9210"
                },
                auth = token.make(payload);

            request('http://localhost:9210')
                .get('/queen/enlist')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .set('X-API-KEY', config.bumblebee.keys.public)
                .end(function(err, res) {
                    res.statusCode.should.equal(200);
                    done();
                });
        });
    });
});

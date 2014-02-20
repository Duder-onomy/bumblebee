var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - client (worker)', function(){
    'use strict';

    var config = require('./fixtures/config'),
        token = require('../lib/token'),
        Bumblebee = require('../lib/bumblebee'),
        bumblebee = new Bumblebee(config),
        payload = require('./fixtures/clientPayload'),
        auth = '';


    before(function(done){
        bumblebee.start();
        bumblebee.on('connected', function(){
            auth = token.make(payload);

            done();
        });
    });

    after(function(done){
        bumblebee.stop();
        done();
    });

    describe('setup the client and test for a connection', function() {
        it('client should return a 401 if a jwt token is not sent to the client', function(done) {
            request('http://localhost:9210')
                .get('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('client should return a 401 if an api key is not sent to the client', function(done) {
            request('http://localhost:9210')
                .get('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('client should return a 401 if an invalid api key is not sent to the client', function(done) {
            request('http://localhost:9210')
                .get('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .set('X-API-KEY', '12345')
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('server should receive a web hook and send back a success status', function(done) {
            request('http://localhost:9210')
                .get('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .set('X-API-KEY', config.bumblebee.keys.public)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(200);
                    done();
                });
        });
    });
});

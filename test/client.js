var should = require('chai').should(),
    request = require('supertest');

describe('bumblebee - server (queen)', function(){
    'use strict';

    var config = require('./fixtures/config'),
        token = require('../lib/token'),
        Bumblebee = require('../lib/bumblebee'),
        bumblebee = new Bumblebee(config),
        payload = require('./fixtures/clientPayload'),
        auth = '';


    before(function(done){
        bumblebee.on('connected', function(){
            auth = token.make({
                repo: 'testrepo',
                branch: 'mybranch'
            });

            done();
        });
    });

    describe('setup the client and test for a connection', function() {
        it('client should return a 401 if a jwt token is not sent to the client', function(done) {
            request('http://localhost:9210')
                .post('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('client should return a 401 if an api key is not sent to the client', function(done) {
            request('http://localhost:9210')
                .post('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('client should return a 401 if an invalid api key is not sent to the client', function(done) {
            request('http://localhost:9210')
                .post('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .set('X-API-KEY', '12345')
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(401);
                    done();
                });
        });

        it('server should receive a web hook and send back a success status', function(done) {
            request('http://localhost:9210')
                .post('/worker/build')
                .set('Accept', 'application/json')
                .set('Accept-Language', 'en_US')
                .set('authorization', 'Token ' + auth)
                .set('X-API-KEY', config.bumblebee.keys.public)
                .send(payload)
                .end(function(err, res) {
                    if (err) { throw err; }
                    res.statusCode.should.equal(200);
                    done();
                });
        });
    });
});

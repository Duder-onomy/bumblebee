var should = require('chai').should(),
    token = require('../lib/token'),
    config = require('../lib/config');

describe('test token entity', function(){
    var jwt = '';

    config.init(require('./fixtures/config'));

    it('test that a valid token is created.', function(){
        jwt = token.make({
            repo: 'testrepo',
            branch: 'mybranch'
        });
        jwt.should.be.a.string;
    });

    it('test that a valid token is created.', function(done){
        token.validate(jwt).then(
            function(payload){
                payload.branch.should.equal('mybranch');
            },
            function(err){
                should.not.exist(err);
            }
        ).done(done);
    });
});
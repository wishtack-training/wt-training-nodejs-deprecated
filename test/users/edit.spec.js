/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var async = require('async');
var mongoose = require('mongoose');
var request = require('supertest');

var app = require('../../app');
var User = require('../../models/user');
var TestUtils = require('../lib/test-utils');

var testUtils = new TestUtils();

describe('users edit', function() {

    var _disconnetDataSource = function _disconnetDataSource(done) {

        //if (mongoose.connection.db) {
            mongoose.connection.close(done);
        //    return;
        //}
        //
        //done();

    };

    var _clearDataSource = function _clearDataSource(done) {
        mongoose.connection.db.dropDatabase(done);
    };

    beforeEach(function (done) {

        testUtils.prepareDataSource(done);

    });

    afterEach(function (done) {

        testUtils.destroyDataSource(done);

    });

    it('should show posted data', function(done) {

        request(app)
            .post('/users/edit')
            .send({
                firstName: 'Foo',
                lastName: 'BAR'
            })
            .end(function (err, res) {

                expect(res.status).toBe(200);

                expect(res.text).toContain('Foo');
                expect(res.text).toContain('BAR');

                done();

            });

    });

    it('should entity encode posted data', function(done) {

        request(app)
            .post('/users/edit')
            .send({
                firstName: '<b>Foo</b>',
                lastName: '<b>BAR</b>'
            })
            .end(function (err, res) {

                expect(res.status).toBe(200);

                expect(res.text).toContain('&lt;b&gt;Foo&lt;/b&gt;');
                expect(res.text).toContain('&lt;b&gt;BAR&lt;/b&gt;');

                done();

            });

    });

    it('should show users list', function (done) {

        async.series([
            function (cb) {
                request(app).post('/users/edit').send({firstName: 'Foo', lastName: 'BAR'}).expect(200, cb);
            },
            function (cb) {
                /* Add empty user. */
                request(app).post('/users/edit').send({firstName: '', lastName: ''}).expect(200, cb);
            },
            function (cb) {
                request(app).post('/users/edit').send({firstName: 'Lionel', lastName: 'LAFFARGUE'}).expect(200, cb);
            },
            function (cb) {
                request(app).post('/users/edit').send({firstName: 'Younes', lastName: 'JAAIDI'}).expect(200, cb);
            },
            function (cb) {

                User.find().exec(function (err, users) {

                    expect(users.length).toBe(3);

                    expect(users[0].firstName).toBe('Foo');
                    expect(users[0].lastName).toBe('BAR');

                    expect(users[1].firstName).toBe('Lionel');
                    expect(users[1].lastName).toBe('LAFFARGUE');

                    expect(users[2].firstName).toBe('Younes');
                    expect(users[2].lastName).toBe('JAAIDI');

                    cb();

                });

            },
            function (cb) {

                request(app)
                    .get('/users/edit')
                    .end(function (err, res) {

                        expect(res.status).toBe(200);

                        expect(res.text).toContain('Foo');
                        expect(res.text).toContain('BAR');

                        expect(res.text).toContain('Lionel');
                        expect(res.text).toContain('LAFFARGUE');

                        expect(res.text).toContain('Younes');
                        expect(res.text).toContain('JAAIDI');

                        cb();

                    });
            }
        ], done);

    });

    it('should fail if mongoose fails', function (done) {

        spyOn(mongoose.Query.prototype, 'exec').and.callFake(function (cb) {
            cb({message: 'Something went wrong'});
        });

        request(app)
            .get('/users/edit')
            .end(function (err, res) {

                expect(res.status).toBe(500);

                done();

            });

    });

});

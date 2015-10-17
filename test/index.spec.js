/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var request = require('supertest');

var app = require('../app');

describe('home', function() {

    it('should redirect to user edit', function (done) {

        request(app)
            .get('/')
            .end(function (err, res) {

                expect(res.header.location).toBe('/users/edit');

                done();

            });

    });

});

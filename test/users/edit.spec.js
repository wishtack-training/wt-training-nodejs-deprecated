/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var request = require('supertest');

var app = require('../../app');

describe('users edit', function() {

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

});

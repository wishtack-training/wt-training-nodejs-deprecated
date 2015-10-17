/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var async = require('async');
var mongoose = require('mongoose');

var TestUtils = function TestUtils() {
    this._mongodbUrl = 'mongodb://localhost/wt-training-nodejs-test'
};

TestUtils.prototype.prepareDataSource = function prepareDataSource(done) {

    async.series([

        /* Disconnect. */
        function (cb) {
            mongoose.connection.close(cb);
        },

        /* Connect. */
        function (cb) {
            mongoose.connect(this._mongodbUrl, cb);
        }.bind(this)

    ], done);

};

TestUtils.prototype.destroyDataSource = function destroyDataSource(done) {

    async.series([

        /* Clear. */
        function (cb) {
            mongoose.connection.db.dropDatabase(cb);
        },

        /* Disconnect. */
        function (cb) {
            mongoose.connection.close(cb);
        }

    ], done);

};

module.exports = TestUtils;

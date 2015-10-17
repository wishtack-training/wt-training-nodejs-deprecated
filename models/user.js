/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName: String,
    lastName: String
});

module.exports = User;

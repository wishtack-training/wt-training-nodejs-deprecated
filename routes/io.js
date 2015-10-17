/**
 *
 * (c) 2013-2015 Wishtack
 *
 * $Id: $
 */

var User = require('../models/user');


var ioConnection = function ioConnection(io, socket) {

    var everybodyRoomName = 'everybody';
    var resetMessageName = 'reset';
    var userMessageName = 'user';

    socket.join(everybodyRoomName);

    /* Send all users on connection. */
    User.find({}).exec(function (err, userList) {

        userList.forEach(function (user) {
            socket.emit(userMessageName, user);
        });

    });

    /* Save new users and notify listeners. */
    socket.on(userMessageName, function (userData) {

        if (!userData.firstName && !userData.lastName) {
            return;
        }

        var user = new User({
            firstName: userData.firstName,
            lastName: userData.lastName
        });

        user.save(function (err, user) {
            io.sockets.in(everybodyRoomName).emit(userMessageName, user);
        });

    });

    /* Handle reset. */
    socket.on(resetMessageName, function () {

        User.remove(function () {
            io.sockets.in(everybodyRoomName).emit(resetMessageName);
        });

    });

};

module.exports = ioConnection;

var express = require('express');
var router = express.Router();

router.all('/edit', function (req, res, next) {

    var async = require('async');

    var User = require('../models/user');

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

    async.waterfall([
        function (cb) {

            /* Skip if empty user. */
            if (!user.firstName && !user.lastName) {
                cb(null /* err. */ , null /* user. */, null /* count. */);
                return;
            }

            /* Save user otherwise. */
            user.save(cb);

        },
        function (user, count, cb) {

            /* Load users. */
            User.find({}).exec(cb);

        }
    ], function (err, userList) {

        if (err) {
            next(err);
            return;
        }

        /* Display users. */
        res.render('users/edit', {userList: userList});

    });

});

module.exports = router;

var express = require('express');
var router = express.Router();

router.all('/edit', function (req, res, next) {

    res.render('users/edit', {
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });

});

module.exports = router;

var express = require('express');
var router = express.Router();

router.all('/edit', function (req, res, next) {

    /* Display users. */
    res.render('users/edit');

});

module.exports = router;

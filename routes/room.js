/**
 * Created by User on 05/04/2015.
 */

var express         = require('express');
var rules           = require('./rules');
var router          = express.Router();

/* GET rooms page. */
router.get('/', rules.rules().requiredLogin, function(req, res) {
    res.render('room');
});

module.exports = router;

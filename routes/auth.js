/**
 * Created by User on 05/04/2015.
 */

var express         = require('express');
var mongo           = require('./mongo');
var bcrypt          = require('./bcrypt');
var rules           = require('./rules');

var router = express.Router();

/* GET authenticate page. */
router.get('/', rules.rules().isLogged, function(req, res, next) {
    res.render('auth', { csrfToken: req.csrfToken() });
});

/* POST authetication 'login' action*/
router.post('/', function(req, res, next) {
    mongo.Users.findOne({ email: req.body.email }, function(err, user) {
        if (err) {
            var error = 'Opps, something happened! Try again in few minutes!'
            res.render('auth', { error: error });
        } else {
            var error = "";

            if (!user) {
                error = "Invalid email or password!";
                res.render('auth', { error: error });
            } else {
                if (bcrypt.crypt().compareHashSync(req.body.password, user.password)) {
                    req.session.user = user;
                    res.redirect('/room');
                } else {
                    error = "Invalid email or password!";
                    res.render('auth', { error: error });
                }
            }
        }
    });
});
module.exports = router;

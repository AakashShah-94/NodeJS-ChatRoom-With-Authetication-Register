/**
 * Created by User on 06/04/2015.
 */

var session         = require('client-sessions');
var _s = session({
    cookieName: 'session',
    secret: 'kas08c23542487f5yh37534u8hfg89534h8uydf',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, // don't have acess to cookies via javascript
    secure: true, // only use cookies with https
    ephemeral: true // delete cookies when browser is closed.
});
module.exports.session = _s;

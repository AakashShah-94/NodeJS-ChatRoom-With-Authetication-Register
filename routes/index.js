var express = require('express');
var router = express.Router();

var title = "Chat Room";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports.index = router;

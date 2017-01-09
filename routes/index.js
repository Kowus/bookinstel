var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'bookinstel',
	  subtitle: 'Ditch The Middle-man'
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express App', welcome: 'Welcome to my first Node Express app.' });
});

// Get Cats page
router.get('/cats', function(req, res, next) {
  res.render('cats', { welcome: 'Welcome to my cats page.' });
});

// Get Dogs page
router.get('/dogs', function(req, res, next) {
  res.render('dogs', { welcome: 'Welcome to my dogs page.' });
});

module.exports = router;

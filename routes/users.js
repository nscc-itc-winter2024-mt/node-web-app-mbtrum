var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('LIST all users.');
});

/* GET a particular user. */
router.get('/display', function(req, res, next) {
  res.send('GET a particular user.');
});

/* DELETE a particular user. */
router.get('/delete', function(req, res, next) {
  res.send('DELETE a particular user.');
});

/* DELETE a particular user. */
router.get('/create', function(req, res, next) {
  res.send('CREATE a user.');
});

/* UPADTE a particular user. */
router.get('/update', function(req, res, next) {
  res.send('UPDATE a user.');
});

module.exports = router;

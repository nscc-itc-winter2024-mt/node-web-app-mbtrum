const express = require('express');
const sqlite3 = require('sqlite3'); 
const path = require('path');

const router = express.Router();

// Open database with read/write permissions
const db = new sqlite3.Database('./db/pets_database.db', sqlite3.OPEN_READWRITE, (err) => {
  if(err)
    console.log("Error:", err);
});

/* GET home page. */
router.get('/', function(req, res, next) {

  // Select records from Pet table
  db.all('SELECT PetId, Name, Age, Breed, PhotoFileName FROM Pet', (err, rows) => {
    res.render('index', { pets: rows });
  });

});

/* GET craete Page */ 
router.get('/create', function(req, res, next) {
  res.render('create');
});

/* POST craete Page */ 
router.post('/create',  function(req, res, next) {
  const name = req.body.Name;
  const age = req.body.Age;
  const breed = req.body.Breed;

  // Upload photo
  const imageFile = req.files.imageFile;
  const imageName = imageFile.name;

  var filepath = path.join(_dirname, 'public', 'uploads', imageName);

  console.log("Save file to: ", filepath);

  res.render('create');
});




module.exports = router;

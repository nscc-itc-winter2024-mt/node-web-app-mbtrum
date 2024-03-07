const express = require('express');
const sqlite3 = require('sqlite3'); 
const path = require('path');
const appRoot = require('app-root-path');

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

/* GET create Page */ 
router.get('/create', function(req, res, next) {
  res.render('create');
});

/* POST create Page */ 
router.post('/create',  function(req, res, next) {
  const name = req.body.Name;
  const age = req.body.Age;
  const breed = req.body.Breed;

  // Upload photo
  const imageFile = req.files.imageFile;
  const imageName = imageFile.name;
  var filepath = path.join(appRoot.path, 'public', 'uploads', imageName);
  imageFile.mv(filepath);
 
  // Add to database
  db.run(`INSERT INTO Pet (Name, Age, Breed, PhotoFileName) VALUES (?, ?, ?, ?)`, name, age, breed, imageName, (err) => {
    if(err)
      console.log("Error: ", err);
    else {
      console.log('Success');
    }    
  });

  res.redirect('/');
});

/* GET Delete page */
router.get('/delete/:id', function(req, res, next) {
  const petId = req.params.id;

  db.get(`SELECT PetId, Name, PhotoFileName from Pet WHERE PetId = ?`, petId, (err, row) => {
    console.log(row);

    if(err) console.log("Error: ", err);
    res.render('delete', { pet: row });   
  });
});


/* POST DELETE page */
router.post('/delete/:id', function(req, res, next) {
  const petId = req.params.id;

  db.run(`DELETE FROM Pet WHERE PetId = ?`, petId, (err) => {
    if(err)
      console.log("Error: ", err);
    else {
      console.log('Success');
    }    
  });
  
  res.redirect('/');
});

module.exports = router;

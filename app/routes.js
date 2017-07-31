var express = require('express');
var path = require('path'); // path helper - makes creating paths very simple - neede for large applications
// create router object
var router = express.Router();


module.exports = router; // creating a module and exporting for use in another file.

//Route router
router.get('/', function(req, res){
  //res.send('hello world!');
  //res.sendFile(path.join(__dirname, '../index.html'));
  var data = require('../data.json');
  res.render('home', { data: data });
});

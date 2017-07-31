var express = require('express');

var app = express();
var port = 8080,
    root = __dirname;

app.set('view engine', 'ejs');
app.set('views', root + '/views');

var router = require('./app/routes'); // tells where to look for routes: ./ means look in the current directory

app.use('/', router);

app.use(express.static(root + '/public'))

app.listen(port, function(){
  console.log( "Express server is listening on port " + port );
  console.log( "To test, browse to http://localhost:" + port );
});

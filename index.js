require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('helpers/jwt');
const errorHandler = require('helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes
app.use('/users', require('./api/users/user.controller'));
app.use('/catalog', require('./api/catalog/catalog.controller'));

// global error handler
app.use(errorHandler);

// Enabling cors
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;

const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
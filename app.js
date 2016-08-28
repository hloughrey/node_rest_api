let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let books = require('./routes/books');

let app = express();

// //don't show the log when it is test
// if(config.util.getEnv('NODE_ENV') !== 'test') {
//     //use morgan to log at command line
//     app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/books', books);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;

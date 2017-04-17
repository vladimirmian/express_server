/**
 * author:Chris.Chien
 * describe:This is main file entry
 */
const express = require('express');
const join = require('path').join;
const fs = require('fs');
const bodyParser = require("body-parser");
const app = express();
const config = join(__dirname, 'config');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
// const database = require('./config/database');
const router = join(__dirname, './router');
const port = process.env.PORT || 3000;
//multi import files
fs.readdirSync(config)
  .filter(file => ~file.search(/^[^\.].*\.js$/))
  .forEach(file => require(join(config, file)));
//define router
require('./config/router.js')(app, bodyParser, session, cookieParser,passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, function(cb) {
    console.log('Express app started on port ' + port);
});
module.exports = app;
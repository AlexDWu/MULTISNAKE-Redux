var express = require('express');
var gameController = require('./gameController');
var bodyParser = require('body-parser');

var session = require('express-session');
// var RedisStore = require('connect-redis')(session);
// var client = require('redis').createClient(process.env.REDIS_URL||{
//     host: "localhost",
//     port: 6379,
//   });

var app = express();
// MIDDLEWARE
app.use(session({
  //   store: new RedisStore({
  //   client: client,
  // }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));
require('./routes')(app);

app.listen(8000);
console.log('Listening to port: 8000');

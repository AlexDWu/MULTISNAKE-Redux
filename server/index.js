var express = require('express');
var gameController = require('./gameController');
var bodyParser = require('body-parser');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var client = require('redis').createClient(process.env.REDIS_URL||{
    host: "localhost",
    port: 6379,
  });


var app = express();
// MIDDLEWARE
app.use(session({
    store: new RedisStore({
    client: client,
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

// ROUTES

// get the game state
// Input in URL path:
  // gameId: id of the game to get information from
// Output in JSON with schema:
// {
//   "$schema": "http://json-schema.org/draft-04/schema#",
//   "title": "Game State",
//   "description": "A snapshot of game instance",
//   "type": "object",
//   "properties": {
//     "id": {
//       "description": "The unique identifier for a game",
//       "type": "integer"
//     },
//     "users": {
//       "title": "Users",
//       "description" : "an array of users connected to this game",
//       "type": "array",
//       "items": {
//         "type": "object",
//         "properties": {
//           "title": "User",
//           "id": {"type": "integer"},
//           "ready": {"type": "boolean"},
//           "color": {"type": "string"},
//           "score": {"type": "integer"}
//         },
//         "required": ["id","ready","color"],
//         "uniqueItems": true
//       }
//     },
//     "board": {
//       "type": "object",
//       "properties": {
//         "dimensions" : {
//           "type": "object",
//           "properties":{
//             "rows": {"type": "integer"},
//             "cols": {"type": "integer"}
//           }
//         }
//         "snakes": {
//           "title": "Snakes",
//           "description" : "an array of the snakes on the broad",
//           "type": "array",
//           "items": {
//             "type": "object",
//             "title": "Snake",
//             "description": "Snake state"
//             "properties": {
//               "color":{"type": "string"},
//               "position": {
//                 "type": "array",
//                 "description": "the spaces that this snake occupies",
//                 "items": {
//                   "type": "object",
//                   "description": "coordinates",
//                   "properties": {
//                     "row": {"type": "integer"},
//                     "col": {"type": "integer"}
//                   }
//                 }
//               }
//             }
//           }
//         },
//         "food": {
//           "type": "array"
//           "description": "the spaces that this food occupies",
//           "items": {
//             "type": "object",
//             "description": "coordinates",
//             "properties": {
//               "row": {"type": "integer"},
//               "col": {"type": "integer"}
//             }
//           }
//         }
//       }
//     }
//   },
//   "required": ["id","users","board"]
// }
app.get('/api/game/:gameId', gameController.getOne);


// update user state
// Input in body
  // connect: false if user wants to disconnect from current a game
  // ready: true if user is ready for game to start, false if user is not ready
  // direction: 'up', 'down', 'left', 'right' the direction the user wants to move in
// info in session 
  // userid: id of the user
// Output: updated user state is JSON with schema:
  // {
  //   "title": "User",
  //   "id": {"type": "integer"},
  //   "ready": {"type": "boolean"},
  //   "color": {"type": "string"},
  //   "score": {"type": "integer"}
  // }
app.put('api/user', userController.update);

// get one user's state
  // Input in URL path
    // id: id number of the user 
// Output: updated user state is JSON with schema:
  // {
  //   "title": "User",
  //   "id": {"type": "integer"},
  //   "ready": {"type": "boolean"},
  //   "color": {"type": "string"},
  //   "score": {"type": "integer"}
  // }
app.get('api/user/:id', userController.getOne);


app.listen(8000);
console.log('Listening to port: 8000');

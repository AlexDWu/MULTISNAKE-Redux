module.exports = function (app) {
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

  // create a new game
  // returns game state object above with a missing board
  app.post('/api/game/');

  // player indicate's that they are ready
  app.put('/api/game/:gameId');


  // update user state
  // Input in body
    // connect: false if user wants to not be connected to a game.
    //   true if user wants to connect to a game.
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
  // get the requesting user's information (userid on session)
  app.get('api/user');
};

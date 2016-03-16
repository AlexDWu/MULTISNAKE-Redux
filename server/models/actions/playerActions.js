var READY = 'PLAYER_READY';
var CONNECT =  'PLAYER_CONNECT';
var DIRECTION = 'PLAYER_DIRECTION';
// value is boolean for if player is ready for the game to start or not
var ready = function(value) {
  return {
    type: READY,
    payload: {
      value: value, // whether or not a player is ready for game to start
    }
  }
}

var connect = function(value) {
  return {
    type: CONNECT,
    payload: {
      value: value, // whether or not a player wants to connect to a game
    }
  }
}
var direction = function(value) {
  return {
    type: DIRECTION,
    payload: {
      value: value, // the direction the player wants to go
    }
  }
}

module.exports = {
  actionTypes:{
    READY: READY,
    CONNECT: CONNECT,
    DIRECTION: DIRECTION,
  },
  actions:{
    ready: ready,
    connect: connect,
    direction: direction,
  },
}

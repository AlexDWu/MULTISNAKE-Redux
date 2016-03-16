// changing direction is a player issued command
//   It's listed in PlayerACtions.js

var CHANGE_DIRECTION = 'CHANGE_SNAKE_DIRECTION';
var INITIALIZE = 'INITIALIZE_SNAKE';
var MOVE = 'MOVE_SNAKE';
var GROW = 'GROW_SNAKE';
var KILL = 'KILL_SNAKE';

// id is the snake ID
var changeDirection = function (direction, id) {
  return {
    type: CHANGE_DIRECTION,
    payload: {
      direction: direction,
      id: id,
    },
  }
}
// move the snake forward
// id is snake id
var move = function (id) {
  return {
    type: MOVE,
    payload: {
      id: id,
    },
  }
}

// grow the snake, maybe food makes in grow a lot or a little
// id is snake id
var grow = function (amount, id) {
  return {
    type: GROW,
    payload: {
      amount: amount,
      id: id,
    },
  }
}

var kill = function (id) {
  return {
    type: KILL,
    payload: {
      id: id,
    }
  };
}

// The game will initialize a snake with what it needs to know
// direction is string, up down left right
// position is object with x and y properties
// color is string with css color
// size is number with the size of the snake
var initialize = function(direction, position, color, size){
  return {
    type: INITIALIZE,
    payload: {
      direction: direction,
      position: position,
      color: color,
      size: size,
    }
  }
}

module.exports = {
  actionTypes: {
    CHANGE_DIRECTION: CHANGE_DIRECTION,
    INITIALIZE: INITIALIZE,
    MOVE: MOVE,
    GROW: GROW,
    KILL: KILL,
  },
  actions: {
    changeDirection: changeDirection,
    initialize: initialize,
    move: move,
    grow: grow,
    kill: kill,
  }
}

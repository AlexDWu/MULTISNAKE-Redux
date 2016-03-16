var SNAKE_ACTIONS = require('../actions/snakeActions');

// default snake state structure
var initialState = {
  size: 0,
  body: [],
  position: {x: 0, y: 0} // the position of the head
  color: '',
  dead: false,
  direction: '',
}

var snake = function (state, action){
  switch (action.type) {
    case SNAKE_ACTIONS.INITIALIZE:
      return Object.assign({}, state, {
        size: action.payload.size,
        position: action.payload.position,
        color: action.payload.color,
        direction: action.payload.direction,
      });
    case SNAKE_ACTIONS.CHANGE_DIRECTION:
      return Object.assign({}, state, {
        direction: action.payload.direction,
      });
    case SNAKE_ACTIONS.MOVE:
      var newHead = {
        x: state.position.x
        y: state.position.y
      };
      // not 100% functional, but I don't know how else to do it
      if (state.direction === 'UP') {
        newHead.y--;
      } else if (state.direction === 'DOWN') {
        newHead.y++;
      } else if (state.direction === 'LEFT') {
        newHead.x--;
      } else if (state.direction === 'RIGHT') {
        newHead.x++;
      }
      if(body.length < state.size){
        // don't remove an element because the snake must GROW
        return Object.assign({}, state, {
          // yes, the head is actally the tail, don't worry about it, it's moving in one direction.
          body: state.body.concat(newHead);
        });
      } else {
        // remove an element (the first one) because snake must not grow
        return Object.assign({}, state, {
          // yes, the head is actally the tail, don't worry about it, it's moving in one direction.
          body: state.body.slice(1).concat(newHead);
        });
      }
    case SNAKE_ACTIONS.GROW:
      return Object.assign({}, state, {
        size: state.size + 1;
      });
    case SNAKE_ACTIONS.KILL:
      return Object.assign({}, state, {
        dead: true;
      })
  }
}

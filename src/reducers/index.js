import { combineReducers } from 'redux';
// import board from './board';
// import classes from './classes';
import squares from './squares';
import game from './game';

const checksApp = combineReducers({
  squares,
  game,
});

export default checksApp;

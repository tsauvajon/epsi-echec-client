import { combineReducers } from 'redux';
import board from './board';
import classes from './classes';

const checksApp = combineReducers({
  board,
  classes,
});

export default checksApp;

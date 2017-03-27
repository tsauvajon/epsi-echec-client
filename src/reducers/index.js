import { combineReducers } from 'redux';
// import board from './board';
// import classes from './classes';
import squares from './squares';

const checksApp = combineReducers({
  squares,
});

export default checksApp;

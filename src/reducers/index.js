import { combineReducers } from 'redux'
import squares from './squares'
// import visibilityFilter from './visibilityFilter'

const checksApp = combineReducers({
  squares,
  // visibilityFilter
});

export default checksApp

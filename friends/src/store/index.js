import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducer'
import {reducer as toastrReducer} from 'react-redux-toastr'
const reducers = {
  rootReducer,
  toastr: toastrReducer 
}
const reducer = combineReducers(reducers)
const middleware = applyMiddleware(thunk, logger)
const store = createStore(reducer, middleware);
export default store;
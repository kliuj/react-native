'use strict'

import {applyMiddleware,createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index';

// const logger = store => next => action => {
//     if(typeof action === 'function') console.log('dispatching a function');
//     else console.log('dispatching', action);
//     let result = next(action);
//     console.log('next state', store.getState());
//     return result;
// }
//
// let middlewares = [
//     logger,
//     thunkMiddleware
// ]

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}

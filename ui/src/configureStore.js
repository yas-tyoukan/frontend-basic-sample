import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';

const middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  const reduxLogger = require('redux-logger');
  middleware.push(reduxLogger.createLogger());
}

export default function configureStore(initialState, reducers, history) {
  middleware.push(routerMiddleware(history));

  if (history) {
    middleware.push(routerMiddleware(history));
  }
  return createStore(
    combineReducers({ ...reducers, form: formReducer, router: connectRouter(history) }),
    initialState,
    compose(applyMiddleware(...middleware)),
  );
}

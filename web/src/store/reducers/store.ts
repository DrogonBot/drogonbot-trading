import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './index.reducers';

// @ts-ignore

const middlewares = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);

export { store };

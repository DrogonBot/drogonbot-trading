import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './index.reducers';

const middlewares = [thunk];

const isClient = process.browser;

let store;

if (isClient) {
  store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares)
      // other store enhancers if any
    )
  );

  store.__PERSISTOR = persistStore(store);
} else {
  store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middlewares)
      // other store enhancers if any
    )
  );
}

export { store };

import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import rootReducer from './index.reducers';

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);

const persistor = persistStore(store);

export { store, persistor };

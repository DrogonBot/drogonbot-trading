import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { counterReducer } from './counter.reducer';
import { formReducer } from './form.reducer';
import { postReducer } from './post.reducer';
import uiReducer from './ui.reducer';

/*#############################################################|
|                        REDUCERS
*##############################################################*/

// Persist config ========================================

const counterPersistConfig = {
  key: "counterReducer",
  storage,
};

const uiPersistConfig = {
  key: "uiReducer",
  storage,
  whitelist: ["searchProvince"],
};

const rootReducer = combineReducers({
  counterReducer: persistReducer(counterPersistConfig, counterReducer),
  uiReducer: persistReducer(uiPersistConfig, uiReducer),
  postReducer,
  formReducer,
});

export default rootReducer;

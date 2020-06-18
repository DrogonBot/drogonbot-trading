import { combineReducers } from 'redux';
import persistReducer from 'redux-persist/lib/persistReducer';
import storage from 'redux-persist/lib/storage';

import { formReducer } from './form.reducer';
import { postReducer } from './post.reducer';
import uiReducer from './ui.reducer';
import { userReducer } from './user.reducer';

const rootReducerPersistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
};

// const resumePersistConfig = {
//   key: "resumeReducer",
//   storage,
//   whitelist: ["selectedResumeId", "resumes"]
// };

const uiPersistConfig = {
  key: "uiReducer",
  storage,
  whitelist: ["searchProvince", "searchCity"],
  blacklist: ["isLoading"],
};

const rootReducer = combineReducers({
  uiReducer: persistReducer(uiPersistConfig, uiReducer),
  userReducer,
  postReducer,
  formReducer,
  // TODO: Comment in when implementing resume
  // resumeReducer: persistReducer(resumePersistConfig, resumeReducer)
});

export type AppState = ReturnType<typeof rootReducer>;

export default persistReducer(rootReducerPersistConfig, rootReducer);

import { combineReducers } from 'redux';

import { formReducer } from './form.reducer';
import { postReducer } from './post.reducer';
import uiReducer from './ui.reducer';
import { userReducer } from './user.reducer';

/*#############################################################|
|                        REDUCERS
*##############################################################*/

const rootReducer = combineReducers({
  uiReducer,
  postReducer,
  formReducer,
  userReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

import { combineReducers } from 'redux';

import { postReducer } from './post.reducer';
import { uiReducer } from './ui.reducer';
import { userReducer } from './user.reducer';

/*#############################################################|
|                        REDUCERS
*##############################################################*/

export const rootReducer = combineReducers({
  userReducer,
  uiReducer,
  postReducer
});

export type AppState = ReturnType<typeof rootReducer>;

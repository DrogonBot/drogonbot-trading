import { combineReducers } from 'redux';

import { uiReducer } from './ui.reducer';
import { userReducer } from './user.reducer';

/*#############################################################|
|                        REDUCERS
*##############################################################*/

export const rootReducer = combineReducers({
  userReducer,
  uiReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

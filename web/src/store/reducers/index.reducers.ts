import { combineReducers } from 'redux';

import { formReducer } from './form.reducer';
import { postReducer } from './post.reducer';
import uiReducer from './ui.reducer';

/*#############################################################|
|                        REDUCERS
*##############################################################*/

const rootReducer = combineReducers({
  uiReducer,
  postReducer,
  formReducer,
});

export default rootReducer;

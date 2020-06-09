const INITIAL_STATE = {
  marketingPosts: [],
};

export const postReducer =  (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case POSTS_READ_MARKETING:
      return { ...state, marketingPosts: action.payload };
    default:
      return state;
  }
};

export const POSTS_READ_MARKETING = "POSTS_READ_MARKETING";

/*

 =========  Safe state update in reducers =========

// From arrays
Removing: state.filter(element => element !== 'hi');
adding: [...state, 'hi'];
replacing: state.map(el => el === 'hi' ? 'bye': el);

//From objects
updating: {...state, name: 'Sam'};
adding: {...state, age: 30};
removing: {state, age: undefined }

*/

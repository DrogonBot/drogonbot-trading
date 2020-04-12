const INITIAL_STATE = {
  counter: 0
};

export const counterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case COUNTER_CHANGE:
      return { ...state, counter: action.payload };

    default:
      return state;
  }
};

export const COUNTER_CHANGE = "COUNTER_CHANGE";

import { COUNTER_CHANGE } from '../reducers/counter.reducer';

export const counterChange = (newValue: number) => async dispatch => {
  dispatch({ type: COUNTER_CHANGE, payload: newValue });
};

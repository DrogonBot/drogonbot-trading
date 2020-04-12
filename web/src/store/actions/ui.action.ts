import { IPaginationData } from '../../types/UI.types';
import { SET_LOADING, SET_PAGINATION_LOADING_KEY_VALUES, SET_SEARCH_KEY_VALUE } from '../reducers/ui.reducer';

export const setSearchKey = (key: string, value: string) => async (
  dispatch
) => {
  dispatch({
    type: SET_SEARCH_KEY_VALUE,
    payload: {
      key,
      value,
    },
  });
};

export const setLoading = (status: boolean, key: string = "default") => (
  dispatch
) => {
  // status regulates if we're in a loading state or not (useful for triggering the loading)
  // key is used to set a loading bar to only certain elements (like BlockButton for example), if needed.

  dispatch({
    type: SET_LOADING,
    payload: {
      status,
      key,
    },
  });
};

export const setPaginationKeyValues = (payload: IPaginationData) => async (
  dispatch
) => {
  dispatch({
    type: SET_PAGINATION_LOADING_KEY_VALUES,
    payload,
  });
};

interface IState {
  searchProvince: string | null;
  searchCity: string | null;
  searchKeyword: string | null;
  isLoading: {
    status: boolean;
    key: string | null;
  };
  paginationData: {
    page: number;
    totalDocs: number | null;
    limit: number | null;
    totalPages: number | null;
    hasPrevPage: boolean | null;
    hasNextPage: boolean | null;
    prevPage: number | null;
    nextPage: number | null;
  };
}

const INITIAL_STATE = {
  searchProvince: "ES",
  searchCity: "Vila Velha",
  searchKeyword: null,
  isLoading: {
    status: false,
    key: null,
  },
  paginationData: {
    // not persistent
    page: 1, // start on page 1
    totalDocs: null,
    limit: null,
    totalPages: null,
    hasPrevPage: null,
    hasNextPage: null,
    prevPage: null,
    nextPage: null,
  },
};

export default (state: IState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SEARCH_KEY_VALUE:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: {
          status: action.payload.status,
          key: action.payload.key,
        },
      };

    case SET_PAGINATION_LOADING_KEY_VALUES:
      // remove docs, since we dont store it here
      if (action.payload?.docs) {
        delete action.payload.docs;
      }

      return {
        ...state,
        paginationData: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export const SET_LOADING = "SET_LOADING";
export const SET_MESSAGE = "SET_ERROR";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export const SET_SEARCH_KEY_VALUE = "SET_SEARCH_KEY_VALUE";
export const SET_PAGINATION_LOADING_KEY_VALUES =
  "SET_PAGINATION_LOADING_KEY_VALUES";

export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const SET_MODAL_STATUS = "SET_MODAL_STATUS";

export const ADD_ATTACHED_IMAGE = "ADD_ATTACHED_IMAGE";
export const REMOVE_ATTACHED_IMAGE = "REMOVE_ATTACHED_IMAGE";

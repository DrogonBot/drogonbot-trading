import { IUser } from '../../types/User.types';

const INITIAL_STATE = {
  user: null,
  token: null,
  onboarding: false,
  resumes: [],
};
export const userReducer = (state: IUserState = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_REFRESH_INFO:
    case USER_LOGIN:
      // Store token on async storage as well (some classes cannot access redux, so we'll have to use async storage to store the token)

      if (process.browser) {
        console.log("logging in user...");
        window.localStorage.setItem("token", action.payload.token);
      }

      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case USER_LOGOUT:
      return INITIAL_STATE;

    case USER_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    case USER_SET_ONBOARDING:
      return { ...state, onboarding: action.payload };

    default:
      return state;
  }
};

// Types ========================================

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_UPDATE = "USER_UPDATE";
export const USER_REFRESH_INFO = "USER_REFRESH_INFO";
export const USER_SET_ONBOARDING = "USER_SET_ONBOARDING";
export const PURGE = "PURGE";

// Interface ========================================

export interface IUserState {
  user: IUser | null;
  token: string | null;
  onboarding: boolean | false;
  // resumes: IResumeState[] | []; //TODO: Wait until resumes are implemented!
  resumes: any;
}

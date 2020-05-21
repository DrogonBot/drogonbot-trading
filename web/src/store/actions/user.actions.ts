import { appEnv } from '../../constants/Env.constant';
import { APIHelper } from '../../helpers/APIHelper';
import { TS } from '../../helpers/LanguageHelper';
import { IRequestDefaultError, RequestTypes } from '../../types/Request.types';
import {
  AuthType,
  ICredentials,
  IFacebookAuthPayload,
  IGoogleAuthPayload,
  INewAccount,
  IUser,
} from '../../types/User.types';
import { USER_LOGIN, USER_LOGOUT, USER_REFRESH_INFO, USER_SET_ONBOARDING, USER_UPDATE } from '../reducers/user.reducer';
import { setSearchKey } from './ui.action';

export const userLogin = (
  payload: ICredentials | IGoogleAuthPayload | IFacebookAuthPayload,
  type: AuthType = AuthType.EmailPassword
) => async (dispatch: any) => {
  try {
    let response;

    if (type === AuthType.EmailPassword) {
      response = await APIHelper.request(
        RequestTypes.POST,
        "/users/login",
        payload,
        false
      );
    }

    if (type === AuthType.FacebookOAuth) {
      payload.language = appEnv.language;

      response = await APIHelper.request(
        RequestTypes.POST,
        "/users/login/facebook-oauth",
        payload,
        false
      );
    }

    if (type === AuthType.GoogleOAuth) {
      payload.language = appEnv.language;

      response = await APIHelper.request(
        RequestTypes.POST,
        "/users/login/google-oauth",
        payload,
        false
      );
    }

    if (response) {
      if (response.data.error) {
        // TODO: Change it to Beacon
        alert(response.data.error);
        // dispatch(
        //   showMessage({
        //     message: response.data.error
        //   })
        // );

        console.log(response.data.error);
        return false;
      }

      if (response.status === 400) {
        // TODO: Change it to Beacon
        alert(response.data.message);
        // dispatch(
        //   showMessage({
        //     message: response.data.message
        //   })
        // );

        return false;
      }

      if (response.data.token) {
        // refresh push token

        // const user = response.data.user;

        await dispatch({ type: USER_LOGIN, payload: response.data });
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export const userLogout = () => async (dispatch) => {
  console.log("Logging out user");

  // Logout him in our server
  const response = await APIHelper.request(
    RequestTypes.POST,
    "/users/logout",
    {},
    true
  );

  if (response) {
    if (response.status !== 200) {
      console.log("error!!");
      console.log(response);
      const errorResponse: IRequestDefaultError = response.data;

      if (process.browser) {
        window.alert(errorResponse.message);
      }
      return;
    }

    window.localStorage.clear();

    await dispatch({ type: USER_LOGOUT });

    // TODO: Redirect to login screen on LOGOUT
  }
};

export const userRegister = (registerCredentials: INewAccount) => async (
  dispatch: any
) => {
  try {
    const response: any = await APIHelper.request(
      RequestTypes.POST,
      "/users",
      registerCredentials,
      false
    );

    if (response.status === 201) {
      // success
      const user = response.data.user;

      if (process.browser) {
        window.alert(TS.string("account", "registerSuccess"));
      }

      await dispatch(
        userLogin({
          email: user.email,
          password: registerCredentials.password,
        })
      );
      return true;
    } else {
      const error: IRequestDefaultError = response.data;

      if (process.browser) {
        window.alert(error.message);
      }
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export const userGetProfileInfo = () => async (dispatch) => {
  console.log("getting profile info...");
  const response = await APIHelper.request(
    RequestTypes.GET,
    "/users/profile",
    {},
    true
  );

  if (response) {
    const user: IUser = response.data.user;
    const token: string = response.data.token;
    if (user) {
      // Update our UI province dropdown
      if (user.stateCode) {
        await dispatch(setSearchKey("searchProvince", user.stateCode));
      }

      console.log("User profile info refreshed!");
      await dispatch({
        type: USER_REFRESH_INFO,
        payload: {
          user,
          token,
        },
      });

      return user;
    }
  }
};

export const toggleOnboarding = (onboardingStatus: boolean) => (dispatch) => {
  dispatch({ type: USER_SET_ONBOARDING, payload: onboardingStatus });
};

export const userUpdateAttribute = (keyValuePairs) => async (dispatch) => {
  const response = await APIHelper.request(
    RequestTypes.PATCH,
    "/users/me",
    keyValuePairs,
    true
  );

  if (response) {
    if (response.status !== 201) {
      console.log("error!!");
      console.log(response);
      const errorResponse: IRequestDefaultError = response.data;

      if (process.browser) {
        window.alert(errorResponse.message);
      }

      return;
    }

    await dispatch({
      type: USER_UPDATE,
      payload: keyValuePairs,
    });

    const updatedUser: IUser = response.data;

    return updatedUser;
  }
};

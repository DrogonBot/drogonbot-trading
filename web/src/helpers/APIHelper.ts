import axios from 'axios';
import Router from 'next/router';

import { appEnv, ENV } from '../constants/Env.constant';
import { EnvironmentTypes } from '../types/Global.types';
import { TS } from './LanguageHelper';

export class APIHelper {
  public static request = async (
    method: any,
    url: string,
    data: object,
    useAuth = true,
    customHeaders: object = {},
    onTimeoutCallback = () => null,
    timeout = 5000
  ) => {
    let AUTH_HEADERS;
    try {
      if (useAuth) {
        const token = await window.localStorage.getItem("token");

        AUTH_HEADERS = {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        };
      }

      const GUEST_HEADERS = {
        "Content-type": "application/json"
      };

      // prepare connection timeout callback
      const abort = axios.CancelToken.source();

      const timeoutCallback = setTimeout(() => {
        abort.cancel(`Timeout of ${timeout}ms.`);
        if (onTimeoutCallback() !== null) {
          onTimeoutCallback();
        } else {
          console.log("request timeout");
          alert(TS.string("global", "requestTimeoutTitle"));
          Router.push("/login");
        }
      }, timeout);

      if (ENV === EnvironmentTypes.Development) {
        console.log(`Request to: ${appEnv.serverUrl}${url}`);
      }

      // execute request

      const response = await axios({
        method,
        url: `${appEnv.serverUrl}${url}`,
        data,
        cancelToken: abort.token,
        validateStatus(status) {
          return status >= 200 && status <= 500; // default
        },
        headers: useAuth
          ? { ...AUTH_HEADERS, ...customHeaders }
          : { ...GUEST_HEADERS, ...customHeaders }
      });

      // If user is not authenticated...
      // 401 = Unauthorized status
      if (response.status === 401) {
        console.log("User is not authenticated. Redirecting to Login...");
        // clear current redux store
        // persistor.purge();

        console.log("authentication error");
        alert(TS.string("account", "loginUserNotAuthenticated"));
        Router.push("/login");
        // NavigationHelper.navigate("Auth", null);
      }

      clearTimeout(timeoutCallback);

      return response;
    } catch (error) {
      console.log(error);
    }
  };
}
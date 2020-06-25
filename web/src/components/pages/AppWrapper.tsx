import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GAnalyticsHelper } from '../../helpers/GAnalyticsHelper';
import { userGetProfileInfo } from '../../store/actions/user.actions';

export const AppWrapper = (props) => {
  const dispatch = useDispatch();

  const refreshUserInfo = () => {
    if (process.browser) {
      if (window.localStorage.getItem("token")) {
        // if theres a token, lets refresh our info
        dispatch(userGetProfileInfo());
      }
    }
  };

  useEffect(() => {
    // * Initialize Google Analytics

    // @ts-ignore
    if (!window.GA_INITIALIZED) {
      GAnalyticsHelper.initGA();
      // @ts-ignore
      window.GA_INITIALIZED = true;
    }
    GAnalyticsHelper.logPageView();

    // * Refresh user information

    refreshUserInfo();

    // refresh user info every 30 seconds
    setInterval(() => refreshUserInfo(), 30 * 1000);
  }, []);

  return <>{props.children}</>;
};

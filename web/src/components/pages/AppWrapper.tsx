import { useDispatch } from 'react-redux';

import { userGetProfileInfo } from '../../store/actions/user.actions';

export const AppWrapper = (props) => {
  if (process.browser) {
    const dispatch = useDispatch();

    if (window.localStorage.getItem("token")) {
      // if theres a token, lets refresh our info
      dispatch(userGetProfileInfo());
    }
  }

  return <>{props.children}</>;
};

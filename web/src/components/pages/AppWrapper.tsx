import { useDispatch } from 'react-redux';

import { userGetProfileInfo } from '../../store/actions/user.actions';

export const AppWrapper = (props) => {
  if (process.browser) {
    const dispatch = useDispatch();

    dispatch(userGetProfileInfo());
  }

  return <>{props.children}</>;
};

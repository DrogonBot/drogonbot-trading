import { useDispatch } from 'react-redux';

import { userGetProfileInfo } from '../../store/actions/user.actions';

export const AppWrapper = (props) => {
  const dispatch = useDispatch();

  dispatch(userGetProfileInfo());

  return <>{props.children}</>;
};

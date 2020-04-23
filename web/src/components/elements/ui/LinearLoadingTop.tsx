import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';

export const LinearLoadingTop = () => {
  const { isLoading } = useSelector<any, any>((state) => state.uiReducer);

  return isLoading?.status && isLoading?.key === "loadingRequest" ? (
    <LinearProgress color="primary" />
  ) : null;
};

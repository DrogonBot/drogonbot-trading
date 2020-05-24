import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const LinearLoadingTop = () => {
  const { isLoading } = useSelector<any, any>((state) => state.uiReducer);

  return isLoading?.status && isLoading?.key === "loadingRequest" ? (
    <Container>
      <LinearProgress color="primary" />
    </Container>
  ) : null;
};

const Container = styled.div`
  flex: 100%;
`;

import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';

import { UI } from '../../../constants/UI/UI.constant';

export const Loading = () => {
  return (
    <Container>
      <CircularProgress />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    max-width: 652px;
  }
`;

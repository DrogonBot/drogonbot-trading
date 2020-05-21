import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';

export const Copyright = () => {
  return (
    <Container>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <a href={appEnv.appUrl}>{appEnv.appName}</a> {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  a {
    color: inherit;
  }
`;

import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';

export const Logo = () => {
  return (
    <LogoContainer>
      <img src={`/images/logo-${appEnv.language}.svg`} />
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  width: 15rem;
  margin: auto;
  margin-bottom: 2rem;
`;
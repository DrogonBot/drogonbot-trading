import Link from 'next/link';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { UI } from '../../../constants/UI/UI.constant';

export const SearchLogo = () => {
  return (
    <Container>
      <Link href="/">
        <img src={`/images/logos/logo-${appEnv.language}.svg`} />
      </Link>
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
  flex: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  width: 120px;
  height: 70px;

  img {
    width: 120px;
  }

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 1;
    max-width: 120px;

    img {
      margin-left: 3rem;
    }
  }
`;

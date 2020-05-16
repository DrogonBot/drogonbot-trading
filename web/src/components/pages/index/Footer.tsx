import Link from 'next/link';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { colors } from '../../../constants/UI/Colors.constant';
import { ContainerDesktop } from '../../../constants/UI/Common.constant';

export const Footer = () => {
  return (
    <ContainerDesktop>
      <FooterContainer>
        <FooterLeft>
          <Link href={"/privacy?language=" + appEnv.language} passHref>
            <a>Privacy</a>
          </Link>
          <Link href={"/terms?language=" + appEnv.language} passHref>
            <a>Terms</a>
          </Link>

          <a href="#">About</a>
        </FooterLeft>

        {/* <FooterRight className="footer-right">
      <a href="#">Advertising</a>
        <a href="#">Business</a>
        <a href="#">Setting</a>
      </FooterRight> */}
      </FooterContainer>
    </ContainerDesktop>
  );
};

const FooterLeft = styled.div`
  flex: 50%;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
`;

// const FooterRight = styled.div`
//   flex: auto;
//   padding: 0.5em;
//   display: flex;
//   justify-content: flex-end;
// `;

const FooterContainer = styled.footer`
  width: 100%;
  max-width: 100%;
  margin-top: 2rem;

  background-color: ${colors.lightSilver};
  display: flex;
  flex-wrap: wrap;

  a {
    padding: 0.7em;
    text-decoration: none;
    color: #666;
    margin: auto 0;
  }
`;

import Link from 'next/link';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { colors } from '../../../constants/UI/Colors.constant';
import { ContainerDesktop } from '../../../constants/UI/Common.constant';
import { TS } from '../../../helpers/LanguageHelper';

export const Footer = () => {
  return (
    <FooterContainer>
      <ContainerDesktop>
        <FooterLeft>
          <Link href={"/privacy?language=" + appEnv.language} passHref>
            <a>{TS.string("global", "genericPrivacyPolicy")}</a>
          </Link>
          <Link href={"/terms?language=" + appEnv.language} passHref>
            <a>{TS.string("account", "genericTermsOfUse")}</a>
          </Link>
          <Link href={"/about?language=" + appEnv.language} passHref>
            <a>{TS.string("global", "genericAbout")}</a>
          </Link>
          <Link href={"/dmca?language=" + appEnv.language} passHref>
            <a>DMCA</a>
          </Link>
        </FooterLeft>

        {/* <FooterRight className="footer-right">
      <a href="#">Advertising</a>
        <a href="#">Business</a>
        <a href="#">Setting</a>
      </FooterRight> */}
      </ContainerDesktop>
    </FooterContainer>
  );
};

const FooterLeft = styled.div`
  flex: 50%;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
  margin-top: 0.7rem;
`;

// const FooterRight = styled.div`
//   flex: auto;
//   padding: 0.5em;
//   display: flex;
//   justify-content: flex-end;
// `;

const FooterContainer = styled.footer`
  flex: 100%;
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

import Link from 'next/link';
import styled from 'styled-components';

import { appEnv } from '../../../constants/Env.constant';
import { colors } from '../../../constants/UI/Colors.constant';
import { ContainerDesktop } from '../../../constants/UI/Common.constant';
import { TS } from '../../../helpers/LanguageHelper';

export const Footer = () => {
  return (
    <ContainerDesktop>
      <FooterContainer>
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

        <FooterRight className="footer-right">
          <PartnersList>
            <PartnerListTitle>
              {TS.string("global", "genericPartners")}
            </PartnerListTitle>
            <PartnerListItem>
              <a href="https://www.navizinhanca.com/" target="_blank">
                <img src="/images/partners/na_vizinhanca.png" />
              </a>
            </PartnerListItem>
            <PartnerListItem>
              <a href="https://www.seujobs.com/" target="_blank">
                <img src="/images/partners/seu_jobs.png" />
              </a>
            </PartnerListItem>
            <PartnerListItem>
              <a href="https://www.temosvaga.com/" target="_blank">
                <img src="/images/partners/temosvaga.png" />
              </a>
            </PartnerListItem>
          </PartnersList>
        </FooterRight>
      </FooterContainer>
    </ContainerDesktop>
  );
};

const FooterLeft = styled.div`
  flex: 50%;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
  margin-top: 0.7rem;
  flex-wrap: wrap;
`;

const FooterRight = styled.div`
  flex: auto;
  padding: 0.5em;
  display: flex;
  justify-content: flex-end;
`;

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

const PartnersList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const PartnerListTitle = styled.span`
  color: ${colors.menuGray};
  padding: 0.7em;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;
const PartnerListItem = styled.div`
  padding: 0.7em;
  text-decoration: none;
  color: #666;
  margin: auto 0;

  img {
    max-width: 80px;
  }
`;

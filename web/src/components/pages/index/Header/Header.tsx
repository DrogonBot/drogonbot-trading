import CopyrightIcon from '@material-ui/icons/Copyright';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import SubjectIcon from '@material-ui/icons/Subject';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import WorkIcon from '@material-ui/icons/Work';
import styled from 'styled-components';

import { appEnv } from '../../../../constants/Env.constant';
import { ContainerDesktop, ContainerMobile } from '../../../../constants/UI/Common.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { INavOption } from '../../../../types/UI.types';
import { DesktopNav } from './DesktopNav';
import MobileNav from './MobileNav';

export const Header = () => {
  // options that will be displayed on both navlinks (desktop) and leftDrawer (mobile)
  const navOptions: INavOption[] = [
    {
      href: "/index",
      text: TS.string("global", "genericHome"),
      icon: <HomeIcon />,
    },
    {
      href: "/posts",
      text: TS.string("post", "postGenericJobRolesText"),
      icon: <WorkIcon />,
    },

    // {
    //   href: "/register",
    //   text: TS.string("account", "registerButtonText"),
    //   icon: <AccountCircleIcon />,
    // },
    {
      href: "/terms?language=" + appEnv.language,
      text: TS.string("account", "genericTermsOfUse"),
      icon: <SubjectIcon />,
      mobileOnly: true,
    },
    {
      href: "/privacy?language=" + appEnv.language,
      text: TS.string("global", "genericPrivacyPolicy"),
      icon: <VpnLockIcon />,
      mobileOnly: true,
    },
    {
      href: "/about?language=" + appEnv.language,
      text: TS.string("global", "genericAbout"),
      icon: <InfoIcon />,
      mobileOnly: true,
    },
    {
      href: "/dmca?language=" + appEnv.language,
      text: "DMCA",
      icon: <CopyrightIcon />,
      mobileOnly: true,
    },
  ];

  return (
    <Container>
      <ContainerDesktop>
        <DesktopNav navOptions={navOptions} />
      </ContainerDesktop>
      <ContainerMobile>
        <MobileNav navOptions={navOptions} />
      </ContainerMobile>
    </Container>
  );
};

const Container = styled.div``;

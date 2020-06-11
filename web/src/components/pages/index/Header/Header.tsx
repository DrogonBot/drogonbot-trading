import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SubjectIcon from '@material-ui/icons/Subject';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import WorkIcon from '@material-ui/icons/Work';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { appEnv } from '../../../../constants/Env.constant';
import { colors } from '../../../../constants/UI/Colors.constant';
import { ContainerDesktop, ContainerMobile } from '../../../../constants/UI/Common.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { AppState } from '../../../../store/reducers/index.reducers';
import { INavOption, NavPosition } from '../../../../types/UI.types';
import { IUser } from '../../../../types/User.types';
import { AccountDropdown } from './AccountDropdown';
import { CreditsDisplay } from './CreditsDisplay';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export const Header = () => {
  const user = useSelector<AppState, IUser>((state) => state.userReducer.user);

  // options that will be displayed on both navlinks (desktop) and leftDrawer (mobile)
  const navOptions: INavOption[] = [
    {
      href: "/index",
      text: TS.string("global", "genericHome"),
      icon: <HomeIcon />,
      primary: true,
      position: NavPosition.NavLeft,
    },
    {
      href: "/posts",
      text: TS.string("post", "postGenericJobRolesText"),
      icon: <WorkIcon />,
      primary: true,
      position: NavPosition.NavLeft,
    },
    !user && {
      // show only to logged out users
      href: "/register",
      text: TS.string("account", "registerButtonText"),
      icon: <AddCircleIcon />,
      primary: true,
      showIconOnDesktop: true,
      position: NavPosition.NavRight,
    },
    !user && {
      href: "/login",
      text: TS.string("account", "loginButtonText"),
      icon: <AccountCircleIcon />,
      primary: true,
      showIconOnDesktop: true,
      position: NavPosition.NavRight,
    },
    {
      href: "/advertise",
      text: TS.string("global", "genericAdvertise"),
      icon: <PostAddIcon />,
      primary: true,
      // customColor: colors.accent,
      position: NavPosition.NavLeft,
    },
    user && {
      // Only show this option on logged in users
      customComponent: <CreditsDisplay />,
      primary: true,
      position: NavPosition.NavRight,
    },

    user && {
      // Only show this option on logged in users
      customComponent: <AccountDropdown key="account-dropdown" />,
      primary: true,
      customColor: colors.accent,
      position: NavPosition.NavRight,
      desktopOnly: true,
    },

    // {
    //   href: "/register",
    //   text: TS.string("account", "registerButtonText"),
    //   icon: <AccountCircleIcon />,
    //   primary: true
    // },
    {
      href: "/terms?language=" + appEnv.language,
      text: TS.string("account", "genericTermsOfUse"),
      icon: <SubjectIcon />,
      mobileOnly: true,
      primary: false,
    },
    {
      href: "/privacy?language=" + appEnv.language,
      text: TS.string("global", "genericPrivacyPolicy"),
      icon: <VpnLockIcon />,
      mobileOnly: true,
      primary: false,
    },
    {
      href: "/about?language=" + appEnv.language,
      text: TS.string("global", "genericAbout"),
      icon: <InfoIcon />,
      mobileOnly: true,
    },
    // {
    //   href: "/dmca?language=" + appEnv.language,
    //   text: "DMCA",
    //   icon: <CopyrightIcon />,
    //   mobileOnly: true,
    // },
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

const Container = styled.div`
  flex: 100%;
`;

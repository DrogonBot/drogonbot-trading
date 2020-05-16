import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SubjectIcon from '@material-ui/icons/Subject';
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
      href: "/",
      text: TS.string("ui", "tabJobs"),
      icon: <WorkIcon />,
    },

    {
      href: "/register",
      text: TS.string("account", "registerButtonText"),
      icon: <AccountCircleIcon />,
    },
    {
      href: "/terms?language=" + appEnv.language,
      text: TS.string("account", "genericTermsOfUse"),
      icon: <SubjectIcon />,
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

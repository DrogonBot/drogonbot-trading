import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { INavOption, NavPosition } from '../../../../types/UI.types';

interface IProps {
  navOptions: INavOption[];
}

export const DesktopNav = ({ navOptions }: IProps) => {
  const { asPath } = useRouter();

  const renderLink = (navOption: INavOption) => {
    return asPath.includes(navOption.href) ||
      (asPath === "/" && navOption.href === "/") ? (
      <LinkActive
        customColor={navOption.customColor}
        href={navOption.href}
        passHref
        key={navOption.href}
      >
        <LinkActiveText customColor={navOption.customColor}>
          {navOption.text.toUpperCase()}
        </LinkActiveText>
      </LinkActive>
    ) : (
      <Link href={navOption.href} passHref key={navOption.href}>
        <LinkNotActive customColor={navOption.customColor}>
          {navOption.text.toUpperCase()}
        </LinkNotActive>
      </Link>
    );
  };

  const onRenderOptions = (navPosition: NavPosition) => {
    const filteredOptions = navOptions.filter(
      (option) =>
        (!option.mobileOnly || option.desktopOnly) &&
        option.position === navPosition
    );

    switch (navPosition) {
      case NavPosition.NavLeft:
        return (
          <NavLeft>
            {filteredOptions.map((navOption) => renderLink(navOption))}
          </NavLeft>
        );
      case NavPosition.NavRight:
        return (
          <NavRight>
            {filteredOptions.map((navOption) => renderLink(navOption))}
          </NavRight>
        );
    }

    return;
  };

  return (
    <HeaderContainer>
      <Nav>
        {onRenderOptions(NavPosition.NavLeft)}
        {onRenderOptions(NavPosition.NavRight)}

        {/* <NavRight>
          <a href="#">
            <i className="fa fa-th" aria-hidden="true" />
          </a>
          <a href="#">
            <i className="fa fa-bell" aria-hidden="true" />
          </a>
          <a href="#">
            <img
              src="images/rsz_google-profile-picture.jpg"
              id="profile-picture"
              alt="Sample google profile picture"
            />
          </a>
        </NavRight> */}
      </Nav>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  width: 100%;
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1em;
`;

const NavLeft = styled.div`
  display: flex;
  a {
    text-decoration: none;
    color: #757575;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 1em;
    padding: 1em 1em 0.5em 0.5em;
  }
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    text-decoration: none;
    color: #757575;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 1em;
    padding: 1em 1em 0.5em 0.5em;
  }
`;

const LinkActive = styled.a`
  color: ${(props) => (props.customColor ? props.customColor : colors.primary)};
  border-bottom: 2px solid
    ${(props) => (props.customColor ? props.customColor : colors.primary)};
`;

const LinkActiveText = styled.span`
  color: ${(props) => (props.customColor ? props.customColor : colors.primary)};
  position: relative;
  top: -0.6em;
  left: 0.2em;
`;

const LinkNotActive = styled.a`
  position: relative;
  top: -0.6em;
  left: 0.2em;
  color: ${(props) =>
    props.customColor ? props.customColor : colors.textGray};
`;

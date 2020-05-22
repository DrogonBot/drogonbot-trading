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

  const renderComponent = (navOption: INavOption) => {
    if (navOption.customComponent) {
      return navOption.customComponent;
    }

    return asPath.includes(navOption.href) ||
      (asPath === "/" && navOption.href === "/") ? (
      <LinkActive
        customColor={navOption.customColor}
        href={navOption.href}
        passHref
        key={navOption.href}
      >
        <LinkActiveText customColor={navOption.customColor}>
          {navOption.showIconOnDesktop && navOption.icon}
          <div>{navOption.text.toUpperCase()}</div>
        </LinkActiveText>
      </LinkActive>
    ) : (
      <Link href={navOption.href} passHref key={navOption.href}>
        <LinkNotActive customColor={navOption.customColor}>
          {navOption.showIconOnDesktop && navOption.icon}
          <div>{navOption.text.toUpperCase()}</div>
        </LinkNotActive>
      </Link>
    );
  };

  const onRenderOptions = (navPosition: NavPosition) => {
    const filteredOptions = navOptions.filter(
      (option) =>
        (!option?.mobileOnly || option?.desktopOnly) &&
        option?.position === navPosition
    );

    switch (navPosition) {
      case NavPosition.NavLeft:
        return (
          <NavLeft>
            {filteredOptions.map((navOption) => renderComponent(navOption))}
          </NavLeft>
        );
      case NavPosition.NavRight:
        return (
          <NavRight>
            {filteredOptions.map((navOption) => renderComponent(navOption))}
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
    color: ${colors.menuGray};
    font-weight: 500;
    font-size: 1rem;
    margin-right: 1em;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: ${colors.menuGray};
      font-size: 2rem;
      margin-right: 0.4rem;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  a {
    text-decoration: none;
    color: ${colors.menuGray};
    font-weight: 500;
    font-size: 1rem;
    margin-right: 1em;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: ${colors.menuGray};
      font-size: 2rem;
      margin-right: 0.4rem;
    }
  }
`;

const LinkActive = styled.a`
  color: ${(props) => (props.customColor ? props.customColor : colors.primary)};
  border-bottom: 2px solid
    ${(props) => (props.customColor ? props.customColor : colors.primary)};
`;

const LinkActiveText = styled.span`
  color: ${(props) => (props.customColor ? props.customColor : colors.primary)};
`;

const LinkNotActive = styled.a`
  color: ${(props) =>
    props.customColor ? props.customColor : colors.menuGray};
`;

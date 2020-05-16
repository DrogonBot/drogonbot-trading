import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { INavOption } from '../../../../types/UI.types';

interface IProps {
  navOptions: INavOption[];
}

export const DesktopNav = ({ navOptions }: IProps) => {
  const { asPath } = useRouter();

  const renderLink = (href: string, text: string) => {
    return asPath.includes(href) || (asPath === "/" && href === "/") ? (
      <LinkActive href={href} passHref key={href}>
        <LinkActiveText>{text.toUpperCase()}</LinkActiveText>
      </LinkActive>
    ) : (
      <Link href={href} passHref key={href}>
        <LinkNotActive>{text.toUpperCase()}</LinkNotActive>
      </Link>
    );
  };

  const onRenderOptions = () => {
    return navOptions.map((navOption) =>
      renderLink(navOption.href, navOption.text)
    );
  };

  return (
    <HeaderContainer>
      <Nav>
        <NavLeft>{onRenderOptions()}</NavLeft>

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

// const NavRight = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: -0.3em;

//   i {
//     position: relative;
//     top: 0.5em;
//   }

//   a {
//     padding: 0 0.5em;
//     margin-right: 1em;
//   }

//   a,
//   i,
//   img {
//     height: 2em;
//     width: 2em;
//     font-size: 1.1em;
//   }

//   .fa-th,
//   .fa-bell {
//     color: #757575;
//   }

//   #profile-picture {
//     border-radius: 50%;
//   }
// `;

const LinkActive = styled.a`
  color: ${colors.primary};
  border-bottom: 2px solid ${colors.primary};
`;

const LinkActiveText = styled.span`
  color: ${colors.primary};
  position: relative;
  top: -0.6em;
  left: 0.2em;
`;

const LinkNotActive = styled.a`
  position: relative;
  top: -0.6em;
  left: 0.2em;
`;

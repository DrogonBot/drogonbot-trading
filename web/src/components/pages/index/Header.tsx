import styled from 'styled-components';

export const Header = props => {
  return (
    <HeaderContainer>
      <Nav>
        <NavLeft>
          {/* <LinkActive href="#">
            <LinkActiveText>ALL</LinkActiveText>
          </LinkActive>
          <a href="google-images.html">
            <LinkNotActive>IMAGES</LinkNotActive>
          </a> */}
        </NavLeft>

        <NavRight>
          {/* <a href="#">
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
          </a> */}
        </NavRight>
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
    font-weight: bold;
    margin-right: 1em;
    padding: 1em 1em 0.5em 0.5em;
  }
`;

const NavRight = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: -0.3em;

  i {
    position: relative;
    top: 0.5em;
  }

  a {
    padding: 0 0.5em;
    margin-right: 1em;
  }

  a,
  i,
  img {
    height: 2em;
    width: 2em;
    font-size: 1.1em;
  }

  .fa-th,
  .fa-bell {
    color: #757575;
  }

  #profile-picture {
    border-radius: 50%;
  }
`;

// const LinkActive = styled.a`
//   color: #4285f4;
//   border-bottom: 2px solid #4285f4;
// `;

// const LinkActiveText = styled.span`
//   color: #4285f4;
//   position: relative;
//   top: -0.6em;
//   left: 0.2em;
// `;

// const LinkNotActive = styled.span`
//   position: relative;
//   top: -0.6em;
//   left: 0.2em;
// `;

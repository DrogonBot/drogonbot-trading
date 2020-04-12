import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <FooterLeft>
          <a href="#">Advertising</a>
          <a href="#">Business</a>
          <a href="#">About</a>
        </FooterLeft>

        <FooterRight className="footer-right">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Setting</a>
        </FooterRight>
      </div>
    </FooterContainer>
  );
};

const FooterLeft = styled.div`
  width: 50%;
  padding: 0.5em;
  display: flex;
  justify-content: flex-start;
`;

const FooterRight = styled.div`
  width: 50%;
  padding: 0.5em;
  display: flex;
  justify-content: flex-end;
`;

const FooterContainer = styled.footer`
  position: fixed;
  width: 100%;
  max-width: 100%;
  bottom: 0;
  background-color: #e4e4e4;

  div {
    display: flex;
    justify-content: space-between;
  }

  a {
    padding: 0.7em;
    text-decoration: none;
    color: #666;
    margin: auto 0;
  }

  @media screen and (max-width: 400px), screen and (max-height: 410px) {
    display: none;
  }
`;

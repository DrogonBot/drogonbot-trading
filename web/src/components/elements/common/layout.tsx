import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';

export const PageContainer = styled.div`
  flex: 100%;
  padding: 1rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    padding: 0;
  }
`;

export const Body = styled.main`
  flex: 100%;
  min-height: 80%;
  max-width: 100%;
`;

export const PageContent = styled.div`
  margin-bottom: 8rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    margin-left: 10%;
    margin-right: 10%;
    max-width: 700px;
    margin-top: 4rem;
  }

  p {
    line-height: 1.6;
    color: ${colors.textGray};
  }

  h1 {
    color: ${colors.primary};
  }

  h2,
  h3,
  h4 {
    color: ${colors.dark};
  }

  padding-left: 2rem;
  padding-right: 2rem;
`;

export const FormItemContainer = styled.div`
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const PageList = styled.ul`
  list-style: none;
  color: ${colors.silver};
  li {
    margin-bottom: 0.5rem;
  }
  word-break: break-word;
  margin: 0;
  padding: 0;
`;

export const ToolTipText = styled.span`
  font-size: 0.9rem;
`;

export const AccentText = styled.span`
  color: ${colors.accent};
  display: inline;
`;

export const Underline = styled.span`
  text-decoration: underline;
  display: inline;
`;

export const VideoResponsive = styled.div`
  width: 100%;

  iframe {
    width: 100%;
    height: ${({ height }) => height}px;
    padding-bottom: 1.5rem;
  }
`;

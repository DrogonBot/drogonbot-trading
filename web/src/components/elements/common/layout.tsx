import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { UI } from '../../../constants/UI/UI.constant';

export const PageContainer = styled.div`
  padding: 1rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    padding: 0;
  }
`;

export const PageBody = styled.div`
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    margin-left: 13rem;
    margin-right: 7.7rem;
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

  padding-left: 0.8rem;
  padding-right: 0.8rem;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

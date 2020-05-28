import styled from 'styled-components';

import { colors } from './Colors.constant';
import { typography } from './Typography.constant';
import { UI } from './UI.constant';

export const H1 = styled.h1`
  color: ${colors.primary};
`;

export const H2 = styled.h2`
  color: ${colors.primary};
`;

export const Small = styled.p`
  font-size: ${typography.smallTextSize}px;
  color: ${colors.dark};
`;

export const P = styled.p`
  color: ${colors.silver};
`;

export const ContainerMobile = styled.div`
  flex: 100%;
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    display: none;
  }
`;
export const ContainerDesktop = styled.div`
  flex: 100%;
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    display: none;
  }
`;

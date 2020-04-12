import styled from 'styled-components';

import { colors } from './Colors.constant';
import { typography } from './Typography.constant';

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

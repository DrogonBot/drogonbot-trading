import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';

interface IProps {
  href: string;
}

export const TermsOfService: React.FC<IProps> = (props) => {
  return (
    <Container>
      <Link href={props.href}>{props.children}</Link>
    </Container>
  );
};

const Container = styled.p`
  font-size: 0.9rem;
  color: ${colors.silver};
  text-align: center;
  margin-top: 3rem;

  a {
    color: ${colors.silver};
  }
  a:visited {
    color: ${colors.silver};
  }
`;

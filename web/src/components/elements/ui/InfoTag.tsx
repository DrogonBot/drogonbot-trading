import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';
import { typography } from '../../../constants/UI/Typography.constant';
import { UI } from '../../../constants/UI/UI.constant';

interface IProps {
  text: string;
  icon: JSX.Element;
}

export const InfoTag = ({ text, icon }: IProps) => {
  return (
    <Container>
      <Icon>{icon}</Icon>
      <Text>{text}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 6;
  flex-basis: 200px;
  max-width: 200px;
  margin-bottom: 0.5rem;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    margin-bottom: 1.5rem;
  }

  &:hover {
    svg,
    [class*="Text"] {
      color: ${colors.primary};
    }
  }
`;

const Icon = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  max-width: 20px;
  align-items: center;

  svg {
    color: ${colors.dark};
    font-size: 1.5rem;
  }
`;

const Text = styled.div`
  flex: 4;
  color: ${colors.dark};
  font-size: ${typography.smallTextSize}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;
`;

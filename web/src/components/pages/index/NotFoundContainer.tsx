import styled from 'styled-components';

import { colors } from '../../../constants/UI/Colors.constant';

interface IProps {
  text: string;
}

export const NotFoundContainer = (props: IProps) => {
  return (
    <Container>
      <ImgContainer>
        <PostNotFoundImg src={`/images/postNotFound.svg`} />
        <Text>{props.text}</Text>
      </ImgContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  flex-wrap: wrap;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PostNotFoundImg = styled.img`
  max-width: 150px;
  flex: 100%;
`;

const Text = styled.p`
  text-align: center;
  margin-top: 1rem;
  flex: 100%;
  color: ${colors.silver};
  font-size: 14px;
  margin-top: 2rem;
`;

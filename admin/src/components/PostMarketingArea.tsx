import React from 'react';
import styled from 'styled-components';

import { IPostMarketingItem } from '../typescript/Post.types';

interface IProps {
  postMarketingItems: IPostMarketingItem[];
}

export const PostMarketingArea = ({ postMarketingItems }: IProps) => {
  const onRenderPostMarketingItems = () =>
    postMarketingItems.map((item) => (
      <Item>
        <Title>{item.text}</Title>
        <Url>{item.url}</Url>
      </Item>
    ));

  return <Container>{onRenderPostMarketingItems()}</Container>;
};

const Container = styled.div`
  width: 500px;
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  flex: 100%;
`;

const Title = styled.div`
  flex: 100%;
`;
const Url = styled.div`
  flex: 100%;
`;

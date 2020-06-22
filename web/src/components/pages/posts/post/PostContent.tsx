import React from 'react';
import Linkify from 'react-linkify';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { IPost } from '../../../../types/Post.types';
import { PostSeeMoreLink } from './PostSeeMoreLink';

interface IProps {
  post: IPost;
}

export const PostContent = ({ post }: IProps) => {
  const onRenderPostContent = () => {
    // if it has an email or phone, its a fully scrapped page. Lets just display everything
    if (post.email || post.phone) {
      return post.content;
    }

    // if its an indexed page, lets add this "see more" info to redirect user to the destination page
    if (post.externalUrl) {
      return (
        <>
          {post.content.length > 1000
            ? post.content.substr(0, 1000) + "..."
            : post.content.substr(0, post.content.length - 15) + "..."}
          <>
            <PostSeeMoreLink post={post} />
          </>
        </>
      );
    }

    return post.content;
  };

  return (
    <ContentArea>
      <Linkify properties={{ target: "_blank" }}>
        {onRenderPostContent()}
      </Linkify>
    </ContentArea>
  );
};

const ContentArea = styled.p`
  color: ${colors.silver};
  white-space: pre-wrap;
`;

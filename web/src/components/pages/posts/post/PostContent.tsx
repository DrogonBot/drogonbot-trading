import React from 'react';
import Linkify from 'react-linkify';
import styled from 'styled-components';

import { colors } from '../../../../constants/UI/Colors.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { IPost } from '../../../../types/Post.types';

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
      const SeeMore = () => (
        <SeeMoreLink href={post.externalUrl} target="_blank">
          <strong>{TS.string("post", "postMoreInfoDestinationPage")}...</strong>
        </SeeMoreLink>
      );

      return (
        <>
          {post.content.length > 1000
            ? post.content.substr(0, 1000) + "..."
            : post.content.substr(0, post.content.length - 15) + "..."}
          <>
            <SeeMore />
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

const SeeMoreLink = styled.a`
  color: ${colors.accent};
  display: block;
  margin-top: 1.5rem;
`;

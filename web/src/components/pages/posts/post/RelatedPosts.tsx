import React from 'react';

import { IPost } from '../../../../types/Post.types';
import { PostCard } from './PostCard';

interface IProps {
  relatedPosts: IPost[];
}

export const RelatedPosts = ({ relatedPosts }: IProps) => {
  if (!relatedPosts) {
    return null;
  }

  return (
    <div>
      {relatedPosts.map((relatedPost) => (
        <PostCard
          key={relatedPost._id}
          title={relatedPost.title}
          sector={relatedPost.sector}
          content={relatedPost.content}
          slug={relatedPost.slug}
          stateCode={relatedPost.stateCode}
          city={relatedPost.city}
        />
      ))}
    </div>
  );
};

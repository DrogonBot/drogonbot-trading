import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import { ContainerDesktop, ContainerMobile, H2 } from '../../../../constants/UI/Common.constant';
import { UI } from '../../../../constants/UI/UI.constant';
import { TS } from '../../../../helpers/LanguageHelper';
import { IPost, RelatedPostType } from '../../../../types/Post.types';
import { PostCard } from './PostCard';

interface IProps {
  type: RelatedPostType;
  relatedPosts: IPost[];
}

export const RelatedPosts = ({ relatedPosts, type }: IProps) => {
  const carouselSettings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
  };

  const onRenderRelatedPosts = () => {
    if (!relatedPosts) {
      return null;
    }

    return relatedPosts.map((relatedPost) => (
      <PostCard
        key={relatedPost._id}
        title={relatedPost.title}
        sector={relatedPost.sector}
        content={relatedPost.content}
        slug={relatedPost.slug}
        stateCode={relatedPost.stateCode}
        city={relatedPost.city}
        isPremium={relatedPost.premiumOnly}
      />
    ));
  };

  switch (type) {
    case RelatedPostType.Mobile:
      return (
        <ContainerMobile>
          {relatedPosts?.length ? (
            <InternalContainer>
              <H2>{TS.string("post", "postSimilar")}</H2>
              <Slider {...carouselSettings}> {onRenderRelatedPosts()}</Slider>
            </InternalContainer>
          ) : null}
        </ContainerMobile>
      );
    case RelatedPostType.Desktop:
      return (
        <ContainerDesktop>
          {relatedPosts?.length ? (
            <InternalContainer>
              <RelatedPostsWrapper>
                <H2>{TS.string("post", "postSimilar")}</H2>
                <RelatedPostsContainer>
                  {onRenderRelatedPosts()}
                </RelatedPostsContainer>
              </RelatedPostsWrapper>
            </InternalContainer>
          ) : null}
        </ContainerDesktop>
      );
  }
};

const InternalContainer = styled.div`
  padding: 1.5rem;
`;

const RelatedPostsWrapper = styled.div`
  margin-top: 3rem;
`;

const RelatedPostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  /*MOBILE ONLY CODE*/
  @media screen and (max-width: ${UI.mediumLayoutBreak}px) {
    justify-content: center;
  }
`;

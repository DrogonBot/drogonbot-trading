import styled from 'styled-components';

import { TS } from '../../../../helpers/LanguageHelper';
import { AdsenseAdsTypes } from '../../../../types/Ads.types';
import { IPost } from '../../../../types/Post.types';
import { AdsenseHelper } from '../../../ads/AdsenseAds';
import { NotFoundContainer } from '../../index/NotFoundContainer';
import { SearchItem } from './SearchItem';

interface IProps {
  posts: IPost[];
}

export const SearchResults = ({ posts }: IProps) => {
  const filteredPosts = posts.filter((post) => post.owner);

  const onRenderPosts = () => {
    if (!filteredPosts.length) {
      return <NotFoundContainer text={TS.string("post", "postsNotFound")} />;
    }

    return (
      <Container>
        {filteredPosts?.map((post: IPost, index: number) => {
          return index % 2 === 0 ? (
            <div key={post._id}>
              {AdsenseHelper.showAds(AdsenseAdsTypes.ResponsiveAndNative)}
              <SearchItem post={post} />
            </div>
          ) : (
            <SearchItem post={post} />
          );
        })}
      </Container>
    );
  };

  return onRenderPosts();
};

const Container = styled.div`
  margin-top: 2rem;
`;

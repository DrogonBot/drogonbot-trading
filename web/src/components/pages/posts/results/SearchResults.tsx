import styled from 'styled-components';

import { TS } from '../../../../helpers/LanguageHelper';
import { IPost } from '../../../../types/Post.types';
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
        {filteredPosts?.map((post: IPost) => (
          <SearchItem
            id={post._id}
            key={post._id}
            category={post.sector}
            tags={post.jobRoles.join(",")}
            title={post.title}
            date={post.createdAt}
            description={post.content}
            slug={post.slug}
            stateCode={post.stateCode}
            city={post.city}
          />
        ))}
      </Container>
    );
  };

  return onRenderPosts();
};

const Container = styled.div`
  margin-top: 2rem;
`;

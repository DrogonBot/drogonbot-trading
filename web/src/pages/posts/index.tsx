import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styled from 'styled-components';

import { SearchResults } from '../../components/pages/posts/results/SearchResults';
import { SearchBar } from '../../components/pages/posts/SearchBar';
import { SearchLogo } from '../../components/pages/posts/SearchLogo';
import { SearchTabs } from '../../components/pages/posts/SearchTabs';
import { NextSEOPosts } from '../../components/seo/NextSEOPosts';
import { appEnv } from '../../constants/Env.constant';
import { colors } from '../../constants/UI/Colors.constant';
import { UI } from '../../constants/UI/UI.constant';
import { loadCountryProvinces } from '../../store/actions/form.actions';
import { postReadFeed } from '../../store/actions/post.action';
import { IProvince } from '../../types/Form.types';
import { IPost } from '../../types/Post.types';
import { IPaginationData } from '../../types/UI.types';

interface IProps {
  provinces: IProvince[];
  posts: IPost[];
  paginationData: IPaginationData;
}

const Posts = ({ provinces, posts, paginationData }: IProps) => {
  const router = useRouter();

  const { searchProvince, searchKeyword } = router.query;

  useEffect(() => {
    console.log(paginationData);
  }, [paginationData]);

  useEffect(() => {
    // scroll to top on pagination our router.query change
    window.scrollTo(0, 0);
  }, [router.query]);

  const onPageChange = (page: number) => {
    router.push({
      pathname: "/posts",
      query: {
        searchProvince,
        searchKeyword,
        page,
      },
    });
  };

  const jobRole = posts[0]?.jobRoles[0] || searchKeyword || ""; // lets assume the job role based on the first result. If not found, use user searchKeyword

  return (
    <>
      {posts && (
        <NextSEOPosts
          jobRole={jobRole}
          postsQty={posts.length}
          city={posts[0]?.city || null}
          stateCode={searchProvince}
        />
      )}
      <SearchContainer>
        <SearchHeader>
          <SearchLogo />
          <SearchBar provinces={provinces} defaultProvince={searchProvince} />
        </SearchHeader>

        <SearchMain>
          <SearchTabs />
          <SearchResults posts={posts} />

          <PaginationContainer>
            <Pagination
              size="large"
              color="primary"
              page={paginationData.page}
              count={paginationData.totalPages}
              onChange={(e, page) => {
                console.log(`CHANGING TO PAGE ${page}`);
                onPageChange(page);
              }}
              hideNextButton={!paginationData.hasNextPage}
              hidePrevButton={!paginationData.hasPrevPage}
            />
          </PaginationContainer>
        </SearchMain>
      </SearchContainer>
    </>
  );
};

export default Posts;

Posts.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(loadCountryProvinces(appEnv.appCountry));
  console.log("Loading provinces...");
  const provinces = ctx.store.getState().formReducer.states; // populate province dropdown

  console.log("Loading pagination data...");
  const { searchProvince, searchKeyword, page = 1 } = ctx.query;
  console.log(ctx.query);
  await ctx.store.dispatch(
    postReadFeed(page, 40, searchProvince, searchKeyword, false)
  );

  const { posts } = ctx.store.getState().postReducer;
  const { paginationData } = ctx.store.getState().uiReducer;

  return {
    provinces,
    posts,
    paginationData,
    searchProvince,
  };
};

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchMain = styled.div`
  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    margin-left: 13rem;
    margin-right: 7.7rem;
    max-width: 700px;
    margin-top: 4rem;
  }
`;

export const SearchHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    flex: 8;
    margin-top: 1rem;
  }
`;

export const SearchContainer = styled.div`
  padding: 1rem;

  /*DESKTOP ONLY CODE*/
  @media screen and (min-width: ${UI.mediumLayoutBreak}px) {
    padding: 0;
  }

  a {
    color: ${colors.primary};
    &:visited {
      color: ${colors.accent};
    }
  }
`;

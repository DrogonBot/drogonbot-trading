import _ from 'lodash';

import { IAffiliateProduct, IPost } from '../../types/Post.types';

interface IState {
  posts: IPost[];
  post: IPost | null;
  affiliatedProducts: IAffiliateProduct[];
}

const INITIAL_STATE = {
  posts: [],
  post: null, // individual post page
  affiliatedProducts: [],
};

export const postReducer = (state: IState = INITIAL_STATE, action) => {
  switch (action.type) {
    case POST_READ_ONE:
      return {
        ...state,
        post: action.payload,
      };
    case POST_READ_AFFILIATES:
      return {
        ...state,
        affiliatedProducts: action.payload,
      };

    case POST_READ:
      return { ...state, posts: action.payload };
    case POST_READ_ADD:
      const uniquePosts = _.uniqBy(
        [...state.posts, ...action.payload],
        function(post) {
          return post._id;
        }
      );

      return {
        ...state,
        posts: uniquePosts, // make sure its unique
      };

    case POST_UPDATE:
      const updatedPost = action.payload;

      const updatedPosts = state.posts.map((post: any) => {
        // find the post that we want to replace and replace it
        if (post._id === updatedPost._id) {
          return updatedPost;
        }
        return post;
      });

      // then update our state with our updated posts
      return { ...state, posts: updatedPosts };

    case POST_DELETE:
      return {
        ...state,
        posts: state.posts.filter((post: any) => post._id !== action.payload),
      };
    case POST_CLEAR:
      return {
        posts: INITIAL_STATE.posts,
      };

    default:
      return state;
  }
};

export const POST_CREATE = "POST_CREATE";
export const POST_READ = "POST_READ";
export const POST_READ_ADD = "POST_READ_ADD";
export const POST_UPDATE = "POST_UPDATE";
export const POST_DELETE = "POST_DELETE";
export const POST_CLEAR = "POST_CLEAR";
export const POST_READ_ONE = "POST_READ_ONE";
export const POST_READ_AFFILIATES = "POST_READ_AFFILIATES";

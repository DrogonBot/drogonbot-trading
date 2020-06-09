import { APIHelper } from '../../helpers/APIHelper';
import { RequestTypes } from '../../typescript/Request.types';
import { POSTS_READ_MARKETING } from '../reducers/post.reducer';

export const postReadMarketingText = (stateCode: string) => async (
  dispatch
) => {
  const response = await APIHelper.request(
    RequestTypes.GET,
    `/post/marketing/${stateCode}`,
    {},
    true
  );

  if (response) {
    dispatch({ type: POSTS_READ_MARKETING, payload: response.data });
  }
};

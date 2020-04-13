import { APIHelper } from '../../helpers/APIHelper';
import { GenericHelper } from '../../helpers/GenericHelper';
import { IPost } from '../../types/Post.types';
import { RequestTypes } from '../../types/Request.types';
import { IPaginationData } from '../../types/UI.types';
import { POST_CLEAR, POST_READ, POST_READ_ADD, POST_READ_ONE } from '../reducers/post.reducer';
import { setPaginationKeyValues } from './ui.action';

export const postRead = (
  addToEnd: boolean = false,
  page?: number,
  limit?: number,
  keyword?: string | null,
  stateCode?: string | null // filter by province stateCode
) => async (dispatch) => {
  const postUrl = GenericHelper.generateUrlParams("/post", {
    page,
    limit,
    keyword,
    stateCode,
  });

  const response: any = await APIHelper.request(
    RequestTypes.GET,
    postUrl,
    {},
    false
  );

  if (response) {
    if (response.status !== 200) {
      alert(response.data.message);
      return;
    }

    dispatch({
      type: addToEnd ? POST_READ_ADD : POST_READ,
      payload: response.data.docs,
    });

    return response.data;
  }
};

export const postReadFeed = (
  page: number,
  limit: number,
  provinceData: string,
  keywordData?: string,
  addToEnd?: boolean
) => async (dispatch) => {
  // @ts-ignore
  const payload: IPaginationData = await dispatch(
    postRead(addToEnd, page, limit, keywordData, provinceData)
  );
  await dispatch(setPaginationKeyValues(payload)); // save new pagination loading values
};

export const postClearAll = () => async (dispatch) => {
  await dispatch({
    type: POST_CLEAR,
  });
};

export const postReadOne = (id?, slug?) => async (dispatch) => {
  let requestUrl;
  if (id) {
    requestUrl = `?id=${id}`;
  }

  if (slug) {
    requestUrl = `?slug=${slug}`;
  }

  const response = await APIHelper.request(
    RequestTypes.GET,
    `/post/${requestUrl}`,
    {},
    false
  );

  if (response) {
    const data: IPost = response.data;

    if (response.status !== 200) {
      alert(response.data.message);
    }

    await dispatch({
      type: POST_READ_ONE,
      payload: data,
    });
  }
};
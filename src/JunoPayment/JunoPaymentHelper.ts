import axios from 'axios';
import { base64encode } from 'nodejs-base64';

import { junoAxiosRequest } from './junopayment.constants';
import { IJunoAccessTokenResponse } from './junopayment.types';

export class JunoPaymentHelper {

  public static accessToken: string;

  public static initialize = async (): Promise<IJunoAccessTokenResponse> => {

    const basicToken = base64encode(`${process.env.JUNO_CLIENT_ID}:${process.env.JUNO_SECRET}`)

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');


    const response = await axios({
      method: "POST",
      url: `${process.env.JUNO_AUTHORIZATION_SERVER}/oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicToken}`,
      },
      data: params
    })

    const junoResponse: IJunoAccessTokenResponse = response.data;

    JunoPaymentHelper.accessToken = junoResponse.access_token;

    // set it as authorization token for every request...
    junoAxiosRequest.defaults.headers.common.Authorization = `Bearer ${JunoPaymentHelper.accessToken}`

    return response.data;
  }

  public static request = async (method, endpoint: string, data: Object | null) => {

    const response = await junoAxiosRequest.request({
      method,
      url: endpoint,
      data,
    })


    return response
  }






}
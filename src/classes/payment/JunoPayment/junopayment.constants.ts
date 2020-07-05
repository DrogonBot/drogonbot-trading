import axios from 'axios';

export const junoAxiosRequest = axios.create({
  baseURL: process.env.JUNO_RESOURCE_SERVER,
  headers: {
    'X-Api-Version': 2,
    'X-Resource-Token': process.env.JUNO_PRIVATE_TOKEN,
    'Content-type': 'application/json;charset=UTF-8'
  }
})

export const PRICE_PER_CREDIT = 0.33 // in R$
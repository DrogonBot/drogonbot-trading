import axios from 'axios';

export const dataApiAxios = axios.create({
  baseURL: "https://www.alphavantage.co/"
})
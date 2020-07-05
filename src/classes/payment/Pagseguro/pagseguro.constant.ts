import axios from 'axios';


export const pagseguroAxios = axios.create({
  baseURL: process.env.PAGSEGURO_URL,
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${process.env.PAGSEGURO_TOKEN}`,
    "X-api-version": "1.0",
    "X-idempotency-key": ""
  }
})



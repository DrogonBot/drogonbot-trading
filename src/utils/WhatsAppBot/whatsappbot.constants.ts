import axios from 'axios';


export const whatsappAxios = axios.create({
  baseURL: `${process.env.WHATSAPP_INSTANCE_URL}`,
  headers: {
    "Content-type": "application/json"
  },
})
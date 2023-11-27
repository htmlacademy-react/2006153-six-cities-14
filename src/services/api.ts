import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { getToken, saveToken } from '../token/token';
import { DetailMessageType } from '../const/const';

const BACKEND_URL = 'https://14.design.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = 'YS5lZ29yb3ZhQHByZXF1ZWwuYXBw';
    }
    return token;
  });

  /* api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;

        toast.warn(detailMessage.message);
      }

      throw error;
    }
  ); */
  return api;
};

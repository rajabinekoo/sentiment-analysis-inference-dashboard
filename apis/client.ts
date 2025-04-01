import axios, { AxiosInstance } from 'axios';
import { Session } from '@/lib/session';

const SERVER_URL = <string>process.env.NEXT_PUBLIC_SERVER_HOST;

const baseHeaders = (isForm = false) => {
  const session = new Session();
  return {
    Accept: 'application/json',
    'Content-Type': isForm ? 'multipart/form-data' : 'application/json',
    Authorization: `Bearer ${session.getToken()}`,
  };
};

export const getHttpClient = (isForm = false): AxiosInstance => {
  return axios.create({
    baseURL: SERVER_URL,
    headers: baseHeaders(isForm),
  });
};

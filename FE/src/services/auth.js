import axiosClient from './http-common';
import { API_URL_REGISTER, API_URL_ACTIVE_ACCOUNT, API_URL_LOGIN } from '../contants/configUrl';

export const login = (body) => {
  return axiosClient.post(API_URL_LOGIN, body);
};
export const register = (body) => {
  return axiosClient.post(API_URL_REGISTER, body);
};

// export default new UserService();

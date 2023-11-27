// import authService from './auth';
import axios from 'axios';
import { COOKIE_USER_TOKEN } from '../contants';
import { getCookie } from '../helpers/cookie';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3002',
});

axiosClient.interceptors.request.use((request) => requestHandler(request));

axiosClient.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

const errorHandler = (error) => {
  console.log('error', error);
  /*
   * When response code is 401, try to refresh the token or logOut.
   * Eject the interceptor so it doesn't loop in case
   * token refresh causes the 401 response
   */
  if (error.response.status === 401) {
    axios.interceptors.response.eject(this.axiosInstance);
    // TODO: refresh token or logout
    // clear old token
    localStorage.clear();
    // redirect to login page
    window.location.href = window.location.origin + '/login';
    // TODO: toast message or warning
  }
  if (error.response.status === 415) {
    // show toast message chung là bạn không có quyền
  }

  // server error
  if (error.response.status === 500) {
    // TODO: toast message or warning
  }

  return Promise.reject(error.response.data);
};

const successHandler = (response) => {
  return response.data;
};

const requestHandler = (request) => {
  const token = getCookie(COOKIE_USER_TOKEN);
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return request;
};

export default axiosClient;

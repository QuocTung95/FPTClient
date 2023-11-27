import axiosClient from './http-common';
import { API_URL_GET_LIST_POLL, API_URL_CREATE_POLL, API_URL_UPDATE_POLL } from '../contants/configUrl';

export const getList = (filters = {}) => {
  return axiosClient.get(API_URL_GET_LIST_POLL, filters);
};

export const getDetailData = (id) => {
  return axiosClient.get(`${API_URL_GET_LIST_POLL}/${id}`);
};

export const createPoll = (body) => {
  return axiosClient.post(API_URL_CREATE_POLL, body);
};

export const updatePoll = (body) => {
  return axiosClient.post(API_URL_UPDATE_POLL, body);
};

import { Axios } from '@/api/Axios';

import type { IResponse, ILogin, IUserInfo } from '@/api/types';

const axios = new Axios();

// 登录
export const login = (username: string, password: string): Promise<IResponse<ILogin>> => {
  const params = new FormData();
  params.append('username', username);
  params.append('password', password);
  return axios.post<ILogin>({ url: '/login', data: params, contentType: 'formData' });
};

// 获取登录用户信息
export const getUserInfo = (): Promise<IResponse<IUserInfo>> => {
  return axios.get<IUserInfo>({ url: '/user/info' });
};

// 退出登录
export const logout = (accessToken: string): Promise<IResponse<any>> => {
  return axios.post({ url: '/logout', data: { accessToken }, contentType: 'formData' });
};

// 登录
export const authLogin = (params): Promise<IResponse> => {
  const authURL = process.env.VITE_AUTH_LOGIN;
  const returnUrl = `${window.location.origin}${process.env.VITE_BASE_ROUTE}/token-transfer`;
  const url = `${authURL}?response_type=code&scope=uid,name,mail&redirectUri=${returnUrl}`;
  return axios.get({ url, data: params });
};

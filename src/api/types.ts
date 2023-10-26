import type { ResponseType } from 'axios';
import type { IUser } from '@/api/types';

export interface IResponse<T = any> {
  code: number;
  message: string;
  data?: T;
}

export interface IMap {
  [key: string]: string;
}

export interface IGetParams {
  url: string;
  data?: any;
}

export interface IPostParams {
  url: string;
  data?: any;
  contentType?: keyof IMap;
  responseType?: ResponseType;
}

export interface IUploadParams {
  url: string;
  data?: any;
  responseType?: ResponseType;
}

export interface ILogin {
  refresh_token: string;
  status: number;
  token: string;
  user: IUser;
}

export * from '@/api/Login/types';
export * from '@/api/Project/types';
export * from '@/api/strategy/types';
export * from '@/api/Invite/types';

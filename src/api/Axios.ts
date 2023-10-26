import axios from 'axios';

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

import Cookies from 'js-cookie';
// import Router from '@/router';
import type { IResponse, IGetParams, IPostParams, IUploadParams } from '@/api/types';

// 白名单
const WHITE_LIST: Array<string> = [
  'login', //
  'register'
];

interface IMap {
  [key: string]: string;
}

const responseChecker = (response: AxiosResponse): boolean => {
  const { status, data } = response;
  return status === 200 && (data.status === 1 || data.code === 200 || data.code === 1);
};

export class Axios {
  private instance: AxiosInstance;

  // private prefixUrl: string | undefined = process.env.TRIDENT_CENTER_SERVER_API;
  private prefixUrl: string | undefined = '/pat2_api';

  private ContentTypeMap: IMap = {
    'x-www-form-urlencoded': 'application/x-www-form-urlencoded;charset=UTF-8',
    json: 'application/json;charset=UTF-8',
    formData: 'multipart/form-data'
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      ...config
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(this.requestSuccess, this.requestError);

    const fn = this.responseSuccess as any as (v) => AxiosResponse;

    this.instance.interceptors.response.use(fn, this.responseError);
  }

  private requestSuccess(config: InternalAxiosRequestConfig) {
    const index = WHITE_LIST.findIndex(url => config.url?.includes(url));

    const token = Cookies.get(process.env.VITE_COOKIE_KEY);

    if (token !== undefined && index === -1) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  private requestError(error: any) {
    return Promise.reject(error);
  }

  private responseSuccess(response: AxiosResponse): IResponse | Promise<IResponse> {
    if (responseChecker(response)) {
      const res: IResponse = {
        code: 1,
        message: 'success',
        data: response.data.code !== undefined ? response.data.data : response.data
      };
      return res;
    }
    const res: IResponse<any> = {
      code: response.data.status !== undefined ? response.data.status : response.data.code,
      message: response.data.errMsg !== undefined ? response.data.errMsg : response.data.message
    };
    return Promise.reject(res);
  }

  private async responseError(error: any) {
    if (error.response && error.response.status) {
      const statusCode: number = error.response.status;

      if (statusCode === 401 || statusCode === 302) {
        // ElMessage.error('登录过期');
        // const loginStore = LoginStore();
        // await loginStore.ClearUserToken();
        // if (Router.currentRoute.value.meta.module !== 'LOGIN') {
        //   const currentRoutePath = Router.currentRoute.value.fullPath;
        //   Router.replace({
        //     path: process.env.LOGIN_PATH,
        //     query: {
        //       redirect: currentRoutePath
        //     }
        //   });
        // }
      }
    }
    const res: IResponse<any> = {
      code: error.response?.status || 0,
      message: error.response?.data?.error || 'error'
    };
    return Promise.reject(res);
  }

  public request<T = any>(config: AxiosRequestConfig): Promise<IResponse<T>> {
    return this.instance.request<any, IResponse, any>(config);
  }

  public get<T = any>({ url, data }: IGetParams): Promise<IResponse<T>> {
    return this.instance.get(
      url.includes('http') ? url : `${this.prefixUrl}/${url}`, //
      { params: data }
    );
  }

  public post<T = any>({
    url,
    data,
    contentType,
    responseType
  }: IPostParams): Promise<IResponse<T>> {
    return this.instance.post(
      url.includes('http') ? url : `${this.prefixUrl}/${url}`, //
      data,
      {
        headers: {
          'Content-Type': this.ContentTypeMap[contentType]
        },
        responseType
      }
    );
  }

  public upload({ url, data = new FormData(), responseType }: IUploadParams) {
    return this.post({
      url,
      data,
      contentType: 'formData',
      responseType
    });
  }

  public download({ url, data = new FormData() }: IUploadParams) {
    const header = {};

    const token = Cookies.get(process.env.VITE_COOKIE_KEY);
    if (token) {
      header['Authorization'] = token;
    }

    const instance = axios.create({
      timeout: 60000,
      headers: header,
      responseType: 'blob'
    });

    return instance.post(url.includes('http') ? url : `${this.prefixUrl}/${url}`, data);
  }
}

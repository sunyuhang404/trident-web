import { Axios } from '@/api/Axios';

import type { IProject, IResponse } from '@/api/types';

const axios = new Axios();

// 获取项目列表
export const getProjectList = (): Promise<IResponse<IProject[]>> => {
  return axios.get<IProject[]>({ url: '/project/list' });
};

// 创建项目
export const CreateProject = (projectName: string): Promise<IResponse<IProject>> => {
  return axios.post<IProject>({ url: '/project/add', data: { name: projectName } });
};

// 邀请
// export const Invite = (projectId: number) => {};

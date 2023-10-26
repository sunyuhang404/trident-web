import { Axios } from '@/api/Axios';
import type { IInviteResponse, IResponse } from '@/api/types';

const axios = new Axios();

export const CreateInviteCode = ({
  projectId,
  validMinutes = 1440,
  maxTimes = 1
}): Promise<IResponse<IInviteResponse>> => {
  return axios.get<IInviteResponse>({
    url: `/project/createInviteCode/${projectId}/${validMinutes}/${maxTimes}`
  });
};

export const JoinProject = (inviteCode: string) => {
  return axios.get({ url: `/project/join/${inviteCode}` });
};

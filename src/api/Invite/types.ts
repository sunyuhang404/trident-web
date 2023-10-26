export interface IInviteResponse {
  createTime: number;
  creator: number;
  expireTime: number;
  id: number;
  inviteCode: string;
  maxTimes: number;
  projectId: number;
  useTimes: number;
}

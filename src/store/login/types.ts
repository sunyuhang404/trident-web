export interface IUser {
  admin: number;
  createTime: number;
  email: string;
  employeeNumber: string;
  id: number;
  mobile: string;
  name: string;
  rtx: string;
  status: number;
  username: string;
}

export interface ILoginStore {
  userInfo?: IUser;
  userToken: string;
}

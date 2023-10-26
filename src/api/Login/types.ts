export interface IUser {
  id: number;
  username: string;
  name: string;
  email: string;
  mobile?: string;
  rtx: string;
  employeeNumber?: string;
  status?: number;
  admin: number;
  createTime?: number | string;
}

export interface IUserInfo {
  user: IUser;
  authorities: Array<string | number>;
}

export interface ILoginParams {
  username: string;
  password: string;
  isRemember: boolean;
}

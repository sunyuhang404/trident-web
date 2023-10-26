import { IProject } from '@/api/types';

export interface IGlobalStore {
  isAdmin: boolean;
  auth: Array<string | number>;
  projectList: IProject[];
  currentProject?: IProject;
}

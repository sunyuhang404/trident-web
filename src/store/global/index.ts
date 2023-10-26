import { defineStore } from 'pinia';
import type { IGlobalStore } from '@/store/global/types';
import { ProjectApi } from '@/api';
import { IProject } from '@/api/types';

export const GlobalStore = defineStore('GlobalStore', {
  state: (): IGlobalStore => {
    return {
      isAdmin: false,
      projectList: [],
      auth: [],
      currentProject: null
    };
  },

  actions: {
    // [mk] 获取登录用户的项目列表
    GetProjectList() {
      return new Promise(async resolve => {
        try {
          const res = await ProjectApi.getProjectList();
          this.projectList = res.data;
          if (!this.currentProject && this.projectList.length > 0) {
            this.currentProject = this.projectList[0];
          }
          resolve(this.projectList);
        } catch {
          this.projectList = [];
          resolve([]);
        }
      });
    },

    SetProject(project: IProject) {
      this.currentProject = project;
    },

    Clear() {
      this.projectList = [];
    },

    SetAuth(authList) {
      this.auth = authList;
    },

    SetAdmin(isAdmin) {
      this.isAdmin = isAdmin;
    }
  }
});

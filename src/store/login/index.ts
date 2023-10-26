import { defineStore } from 'pinia';
import { GlobalStore } from '@/store';
import type { ILoginStore } from '@/store/login/types';
import { LoginApi } from '@/api';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

export const LoginStore = defineStore('LoginStore', {
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['userInfo', 'userToken'] } //
    ]
  },
  state: (): ILoginStore => {
    return {
      userToken: Cookies.get(process.env.VITE_COOKIE_KEY) || '',
      userInfo: null
    };
  },

  getters: {
    username: state => (state.userInfo ? state.userInfo.name : '')
  },

  actions: {
    SetUserToken(token: string) {
      try {
        this.userToken = token;
        Cookies.set(process.env.VITE_COOKIE_KEY, token);
      } catch (error) {
        console.log(error);
      }
    },

    ClearUserToken() {
      return new Promise<void>(async resolve => {
        this.userInfo = null;
        this.userToken = '';

        const globalStore = GlobalStore();
        globalStore.Clear();

        Cookies.remove(process.env.VITE_COOKIE_KEY);
        resolve();
      });
    },

    // 设置 user信息
    SetUserInfo(user) {
      try {
        this.userInfo = user;
      } catch (error) {
        console.log(error);
      }
    },

    async GetUserInfo() {
      try {
        const res = await LoginApi.getUserInfo();
        console.log(res.data.authorities);

        const globalStore = GlobalStore();
        globalStore.SetAuth(res.data.authorities);

        globalStore.SetAdmin(res.data.user.admin);

        this.userInfo = res.data.user;
      } catch (error) {
        ElMessage.error(error.message);
      }
    },
    async LoginOut() {
      try {
        await LoginApi.logout(this.userToken);
      } catch (error) {
        ElMessage.error(error.message);
      } finally {
        await this.ClearUserToken();
      }
    }
  }
});

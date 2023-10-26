<template>
  <div />
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LoginStore } from '@/store';
// import { Base64 } from 'js-base64';
import { LoginApi } from '@/api';

import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();

const loginStore = LoginStore();

onMounted(() => {
  transferPage();
});

const transferPage = async () => {
  if (!route.query.code) {
    ElMessage.error('登录失败');
    logoutFn();
    return;
  }

  try {
    const params = {
      code: route.query.code
    };
    const res = await LoginApi.authLogin(params);
    const { token, user } = res.data;
    console.log('token: ', token);
    console.log('user', user);

    loginStore.SetUserToken(token);
    loginStore.SetUserInfo(user);

    router.replace({ path: '/land' });
  } catch (error) {
    console.log(error);
    ElMessage.error(error?.message || '登录失败');
  }
};

const logoutFn = () => {
  loginStore.Logout();
};
</script>

<template>
  <div class="dev-login-page">
    <div class="login-form">
      <!-- <DeveloperLogin /> -->
      <el-form
        :model="viewModel"
        :rules="rules"
        ref="refForm"
        label-width="0px"
        class="devloper-login"
      >
        <h3 class="title">PAT2</h3>
        <el-form-item prop="username">
          <el-input
            v-model="viewModel.username"
            maxlength="50"
            placeholder="账号"
            @keyup.enter="viewFormVerifyFn"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="viewModel.password"
            maxlength="50"
            placeholder="密码"
            type="password"
            show-password
            @keyup.enter="viewFormVerifyFn"
          />
        </el-form-item>
        <el-checkbox
          v-model="viewModel.isRemember"
          style="margin: 0 0 25px 0"
        >
          记住我
        </el-checkbox>
        <h6 class="title">
          <el-icon
            style="margin-right: 3px; color: red"
            size="12px"
            color="red"
          >
            <Warning />
          </el-icon>
          开发者账号建议与 RTX 账号一致
        </h6>

        <el-button
          :loading="viewIsLoading"
          type="primary"
          size="small"
          @click="viewFormVerifyFn"
          class="login-button"
        >
          登 录
        </el-button>
      </el-form>
    </div>

    <!--  底部  -->
    <div id="el-login-footer" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { LoginApi } from '@/api';

import { LoginStore } from '@/store';
import Cookies from 'js-cookie';
import { Base64 } from 'js-base64';
import { ElMessage } from 'element-plus';
import { Warning } from '@element-plus/icons-vue';
import { trim } from 'lodash';

import { ILoginParams } from '@/api/Login/types';

const viewIsLoading = ref(false);
const viewModel = ref<ILoginParams>({
  username: '',
  password: '',
  isRemember: true
});
const rules = ref({
  username: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
});

const loginStore = LoginStore();

const route = useRoute();
const router = useRouter();

const refForm = ref();

onMounted(() => {
  viewModel.value.username = Cookies.get('username') || '';
  viewModel.value.password = Cookies.get('password')
    ? Base64.decode(Cookies.get('password') as string)
    : '';
});

// 用户名 & 密码校验
const viewFormVerifyFn = () => {
  refForm.value.validate((valid: boolean) => {
    if (valid) {
      loginAction();
    }
  });
};

// 登录
const loginAction = async () => {
  viewIsLoading.value = true;

  try {
    const res = await LoginApi.login(viewModel.value.username, viewModel.value.password);

    loginStore.SetUserToken(res?.data?.token);

    await saveUserIntoCookieFn();

    enterPageFn();
  } catch (error: any) {
    ElMessage.error(error.message);
  } finally {
    viewIsLoading.value = false;
  }
};

const saveUserIntoCookieFn = async () => {
  if (viewModel.value.isRemember === true) {
    Cookies.set('username', trim(viewModel.value.username));
    Cookies.set('password', Base64.encode(trim(viewModel.value.password)));
  } else {
    Cookies.set('username', '');
    Cookies.set('password', '');
  }
};

// [mk] 路由跳转
const enterPageFn = async () => {
  let nextPath = '/';
  if (route.query && route.query.redirect) {
    nextPath = route.query.redirect as string;
  }
  router.push(nextPath).catch(() => {});
};
</script>

<style lang="less" scoped>
.dev-login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url(https://api.dujin.org/bing/1920.php);

  .login-form {
    width: 450px;
    background-color: rgb(255, 255, 255, 0.8);
    margin: 0px auto;
    border-radius: 4px;

    .devloper-login {
      margin: 30px;
    }

    .title {
      margin: 15px 30px;
      text-align: center;
      color: #707070;
    }

    .login-button {
      width: 65%;
      height: 32px;
      margin-left: 18%;
    }
  }
}
</style>

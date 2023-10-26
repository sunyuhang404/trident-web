<template>
  <div class="sso-login-page">
    <div class="login-box">
      <h6 class="title-header">SSO扫码登录</h6>

      <el-button
        type="primary"
        :icon="Right"
        plain
        circle
        @click="gotoSSOLoginPageAction"
      />

      <h6 class="title-footer">点击跳转OA登录</h6>
    </div>

    <!--  底部  -->
    <div id="el-login-footer" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Base64 } from 'js-base64';
import { Right } from '@element-plus/icons-vue';
import { getState } from '@/utils';

const route = useRoute();

onMounted(() => {
  if (route.query.logout && route.query.logout === 'true') {
    return;
  }
  gotoSSOLoginPageAction();
});

// [mk][sso]
const gotoSSOLoginPageAction = async () => {
  // [mk] 重定向 url
  const redirectPath = (route.query.redirect as string) || '/land';

  const oauthURL = process.env.VITE_SSO_LOGIN_PRE_URL;
  const clientID = process.env.VITE_APP_CLIENT_ID;
  const returnUrl = `${window.location.origin}${process.env.VITE_BASE_ROUTE}/token-transfer`;

  const url = `${oauthURL}?client_id=${clientID}&response_type=code&scope=uid,name,mail&state=${getState()}&redirect_uri=${returnUrl}`;
  console.log(url);

  window.location.href = url;
};
</script>

<style lang="less" scoped>
.sso-login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url(https://api.dujin.org/bing/1920.php);

  .login-box {
    background-color: #fff;
    text-align: center;
    width: 300px;
    border: 1px solid #e9ebec;
    border-radius: 5px;

    .title-header {
      margin: 20px auto 20px auto;
      text-align: center;
      color: #1890ff;
      font-size: 14px;
    }

    .title-footer {
      margin: 20px auto 20px auto;
      text-align: center;
      color: #707070;
    }
  }

  // [mk] sso tab 样式
  .loading-box {
    width: 385px;
    height: 291px;
  }
}
</style>

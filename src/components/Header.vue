<template>
  <header class="header">
    <section class="logo-box">
      <!-- <img class="logo" /> -->
      <el-icon>
        <HomeFilled />
      </el-icon>

      <span class="title"> PAT2 </span>

      <ProjectPopper />
    </section>

    <section class="user-setting-box">
      {{ loginStore.username }}
    </section>
  </header>
</template>

<script setup lang="ts">
import { HomeFilled } from '@element-plus/icons-vue';
import { LoginStore } from '@/store';
import { ProjectPopper } from '@/components';

const loginStore = LoginStore();
</script>

<style lang="less" scoped>
.header {
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  border-bottom: 1px solid #dcdfe6;

  .logo-box {
    display: flex;
    align-items: center;

    .el-icon {
      font-size: 20px;
      color: #409eff;
    }

    .title {
      margin-left: 8px;
      font-size: 18px;
      color: #c0c2c5;
    }
  }

  .user-setting-box {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
}
</style>

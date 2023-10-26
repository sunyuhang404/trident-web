<template>
  <div class="page">
    <Header />

    <main class="page-content">
      <MenuList />

      <section class="page-inner">
        <!-- v-if="globalStore.projectList.length > 0" -->
        <router-view />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Header, MenuList } from '@/components';
import { LoginStore, GlobalStore } from '@/store';
import { ElMessage } from 'element-plus';

const loginStore = LoginStore();
const globalStore = GlobalStore();

const router = useRouter();

loginStore.GetUserInfo();

// 项目初始化请求
onMounted(async () => {
  await globalStore.GetProjectList();
  if (!globalStore.projectList.length) {
    ElMessage.error('尚未加入任何项目，请先加入一个项目');
    router.replace({
      path: '/invite'
    });
  }
});
</script>

<style lang="less" scoped>
.page {
  height: 100%;
  display: flex;

  flex-direction: column;

  .page-content {
    flex: 1;
    overflow: hidden;

    display: flex;
    flex-direction: row;

    .page-inner {
      flex: 1;
      overflow: hidden;
      padding: 16px;
    }
  }
}
</style>

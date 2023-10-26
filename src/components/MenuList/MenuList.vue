<template>
  <div class="menu-list">
    <MenuItem
      v-for="item in menuList"
      :key="`menu-item-${item.id}`"
      :label="item.label"
      :path="item.path"
      :isActive="currentRoute === item.path"
      @change="changeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Grid } from '@element-plus/icons-vue';

import MenuItem from '@/components/MenuList/MenuItem.vue';

const route = useRoute();
const router = useRouter();

const menuList = ref([
  { icon: '', label: '操场', id: 1, path: '/land' },
  { icon: Grid, label: '策略', id: 2, path: '/strategy' }
]);

const currentRoute = computed(() => route.path);

const changeMenu = (path: string) => {
  console.log(path);
  if (path === currentRoute.value) {
    return;
  }

  router.replace({
    path
  });
};
</script>

<style lang="less" scoped>
.menu-list {
  width: 180px;
  min-width: 180px;
  height: 100%;
  padding: 8px 16px;

  border-right: 1px solid #dcdfe6;
}
</style>

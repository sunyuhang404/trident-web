<template>
  <el-popover
    placement="right"
    title=""
    :width="200"
    trigger="click"
    popper-class="project-list-popper"
  >
    <ul class="project-list">
      <li
        v-for="item in projectList"
        :key="`project-item-${item.id}`"
        :class="['project-item', { 'is-active': globalStore?.currentProject?.id === item.id }]"
        @click="selectProject(item)"
      >
        <span class="name">{{ item.name }}</span>
      </li>
    </ul>

    <template #reference>
      <div class="project-box">
        <span class="project-name">{{ globalStore?.currentProject?.name }}</span>
        <el-icon><ArrowDown /></el-icon>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';

import type { IProject } from '@/api/types';
import { GlobalStore } from '@/store';

const globalStore = GlobalStore();

const projectList = computed<IProject[]>(() => globalStore.projectList);

const selectProject = (project: IProject) => {
  globalStore.SetProject(project);
};
</script>

<style lang="less">
.project-box {
  margin-left: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .project-name {
    margin-right: 8px;
  }
}

.project-list-popper {
  .project-list {
    list-style: none;
    margin: 0;
    padding: 0;

    .project-item {
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      border-radius: 4px;
      cursor: pointer;

      &:not(:last-child) {
        margin-bottom: 4px;
      }

      &.is-active {
        background-color: #d9ecff;

        .name {
          color: #409eff;
          font-weight: 500;
        }
      }
    }
  }
}
</style>

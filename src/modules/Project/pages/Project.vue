<template>
  <div class="project">
    <el-button @click="createProject"> 添加项目 </el-button>

    <el-button @click="invite">邀请</el-button>

    <ProjectInfo
      v-model="dialogVisible"
      @close="refresh"
    />

    <el-table
      :data="globalStore.projectList"
      border
      class="project-table"
    >
      <el-table-column label="项目ID">
        <template #default="scope">
          <div class="project-box">
            <span>{{ scope.row.id }}</span>
            <span
              v-if="globalStore?.currentProject?.id === scope.row.id"
              class="is-current"
            >
              当前项目
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        label="项目名称"
        prop="name"
      />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GlobalStore } from '@/store';
import ProjectInfo from '../components/ProjectInfo.vue';
import { InviteApi } from '@/api';
import { ElMessage } from 'element-plus';
import useClipboard from 'vue-clipboard3';

const globalStore = GlobalStore();

const { toClipboard } = useClipboard();

const dialogVisible = ref<boolean>(false);

const createProject = () => {
  dialogVisible.value = true;
};

// 刷新项目列表
const refresh = () => {
  globalStore.GetProjectList();
};

// 生成邀请码
const invite = async () => {
  try {
    const res = await InviteApi.CreateInviteCode({ projectId: globalStore.currentProject?.id });
    console.log(res.data);

    await toClipboard(res.data.inviteCode);
    ElMessage.success('邀请码已复制');
  } catch (error) {
    ElMessage.error(error?.message);
  }
};
</script>

<style lang="less" scped>
.project {
  height: 100%;

  .project-table {
    margin-top: 16px;
    .project-box {
      display: flex;
      align-items: center;

      .is-current {
        margin-left: 4px;
        background-color: #d9ecff;
        padding: 2px;
        border-radius: 4px;
        color: #409eff;
      }
    }
  }
}
</style>

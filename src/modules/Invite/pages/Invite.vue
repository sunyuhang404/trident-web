<template>
  <div class="invite">
    <section class="invite-code-box">
      <el-form
        ref="refForm"
        :model="formModel"
        :rules="formRules"
      >
        <el-form-item
          label="邀请码"
          prop="inviteCode"
        >
          <el-input v-model="formModel.inviteCode" />
        </el-form-item>
      </el-form>

      <el-button
        type="default"
        @click="joinProject"
      >
        加入项目
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { InviteApi } from '@/api';
import type { IInviteModel } from '@/modules/Invite/types';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const router = useRouter();

const formModel = ref<IInviteModel>({
  inviteCode: ''
});

const formRules = ref<FormRules<typeof formModel>>({
  inviteCode: [{ required: true, message: '请输入邀请码', trigger: ['blur', 'change'] }]
});

const refForm = ref<FormInstance>();

const joinProject = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      try {
        await InviteApi.JoinProject(formModel.value.inviteCode);
        ElMessage.success('成功加入项目');

        router.replace({
          path: '/land'
        });
      } catch (error) {
        ElMessage.error(error?.message);
      }
    }
  });
};
</script>

<style lang="less" scoped>
.invite {
  height: 100%;
  display: flex;
  justify-content: center;

  .invite-code-box {
    display: flex;
    margin-top: 100px;
    width: 40%;

    .el-form {
      flex: 1;
    }

    .el-button {
      margin-left: 16px;
      width: 100px;
    }
  }
}
</style>

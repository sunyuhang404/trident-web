<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    @close="closed"
  >
    <el-form
      ref="refForm"
      :model="formModel"
      :rules="formRules"
    >
      <el-form-item
        label="项目名称"
        prop="projectName"
      >
        <el-input v-model="formModel.projectName" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button
        type="default"
        @click="cancel"
      >
        取消
      </el-button>

      <el-button
        type="primary"
        @click="save"
      >
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { ProjectApi } from '@/api';

const emits = defineEmits(['update:modelValue', 'close']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '创建项目'
  }
});

const dialogVisible = ref<boolean>(props.modelValue);

// form
const refForm = ref<FormInstance>();

const formModel = ref({
  projectName: ''
});

const formRules = ref<FormRules<typeof formModel>>({
  projectName: [{ required: true, message: '请输入项目名称', trigger: ['blur', 'change'] }]
});

watchEffect(() => {
  dialogVisible.value = props.modelValue;
});

// 关闭弹窗，修改外部 visible 变量的值
const closed = () => {
  dialogVisible.value = false;
  emits('update:modelValue', dialogVisible.value);
  emits('close');
};

// 创建项目
const save = () => {
  refForm.value.validate(async valid => {
    if (valid) {
      try {
        await ProjectApi.CreateProject(formModel.value.projectName);
        ElMessage.success('创建项目成功');

        closed();
      } catch (error) {
        ElMessage.error(error.message);
      }
    }
  });
};

// 取消创建
const cancel = () => {
  formModel.value.projectName = '';
  closed();
};
</script>

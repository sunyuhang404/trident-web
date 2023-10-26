<template>
  <div
    :class="['menu-item', { 'is-active': isActive }]"
    @click="changeMenu"
  >
    <div class="menu-item--inner">
      <el-icon />
      <span class="menu-item--inner_label">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: '/'
  }
});

const emit = defineEmits(['change']);

const changeMenu = () => {
  emit('change', props.path);
};
</script>

<style lang="less" scoped>
.menu-item {
  height: 40px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  border-radius: 4px;

  transition: all 0.2s;

  cursor: pointer;

  .menu-item--inner {
    color: #000;
  }

  &:hover {
    background-color: #d9ecff;
    .menu-item--inner {
      color: #409eff;
      font-weight: 500;
    }
  }

  &.is-active {
    background-color: #d9ecff;

    .menu-item--inner {
      color: #409eff;
      font-weight: 500;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}
</style>

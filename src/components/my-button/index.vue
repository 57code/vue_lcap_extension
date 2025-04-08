<template>
  <ElButton :type="type" @click="onClick">
    <slot>
      {{ props.label }}
    </slot>
  </ElButton>
</template>
<script setup>
import { ElButton } from "element-plus";
import 'element-plus/es/components/button/style/css';

defineOptions({
  name: "my-button",
});

const props = defineProps({
  type: {
    type: String,
    default: "primary",
  },
  label: {
    type: String,
    default: "按钮",
  },
});

const emit = defineEmits(["my-click"]);

const onClick = function () {
  emit("my-click", {
    timestamp: new Date().getTime(),
  });
};
</script>

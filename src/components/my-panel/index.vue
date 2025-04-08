<template>
  <div :class="$style.container" v-if="show">
    <div :class="$style.header">
      <slot name="header">header</slot>
      <span v-if="canClose" @click="onClose">x</span>
    </div>
    <div :class="$style.body">
      <slot></slot>
    </div>
    <div :class="$style.footer">
      <slot name="footer">footer</slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";

defineProps({
  canClose: {
    type: Boolean,
    default: true,
  },
});

const show = ref(true);

function onClose() {
  show.value = false;
}
</script>
<style module>
.container {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}
.header {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.header span {
  float: right;
  padding-right: 5px;
  cursor: pointer;
}
.body {
  padding: 10px;
  flex: 1;
}
.footer {
  padding: 10px;
  border-top: 1px solid #ccc;
}
</style>

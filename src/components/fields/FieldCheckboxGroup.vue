<template>
  <el-checkbox-group
    v-bind="props.props"
    v-model="checkbox"
  >
    <el-checkbox v-for="item in props.props.options" :value="item.value">
      {{ item.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script lang="ts" setup>

import { ref, onBeforeUpdate } from "vue";

onBeforeUpdate(() => {
  // @change="emit('update:value', checkbox)"
  emit("update:value", checkbox.value);
})
interface FieldCheckboxGroupProp {
  value: string[] | number[] | null;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldCheckboxGroupProp>();

const checkbox = ref<(string | number)[]>([]);
const emit = defineEmits(["update:value"]);

if (props.value && Array.isArray(props.value)) {
  checkbox.value = props.value;
}
</script>

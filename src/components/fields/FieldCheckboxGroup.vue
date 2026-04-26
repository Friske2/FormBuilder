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

import { computed } from "vue";

interface FieldCheckboxGroupProp {
  value: string[] | number[] | null;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldCheckboxGroupProp>();
const emit = defineEmits(["update:value"]);

const checkbox = computed({
  get: () => (Array.isArray(props.value) ? props.value : []),
  set: (val) => emit("update:value", val),
});
</script>

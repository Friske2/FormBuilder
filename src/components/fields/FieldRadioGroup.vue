<template>
  <el-radio-group
    v-bind="props.props"
    v-model="radio"
  >
    <el-radio v-for="item in props.props.options" :value="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface FieldRadioGroupProp {
  value: string | null | number;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldRadioGroupProp>();
const emit = defineEmits(["update:value"]);

const radio = computed({
  get: () => props.value ?? null,
  set: (val) => emit("update:value", val),
});
</script>

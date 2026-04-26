<template>
  <div style="width: 100%">
    <el-date-picker
      v-model="dateValue"
      v-bind="props.props"
      @change="emit('update:value', dateValue)"
    />
  </div>
  <div style="display: block">{{ props.props.desc }}</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

interface FieldDatePickerProp {
  value: string;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldDatePickerProp>();
const emit = defineEmits(["update:value"]);

const dateValue = computed({
  get: () => props.value ?? "",
  set: (val) => emit("update:value", val),
});
</script>

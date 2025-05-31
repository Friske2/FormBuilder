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
import { ref } from "vue";

const props = defineProps<{
  value: string;
  props: {
    [key: string]: any;
  };
}>();

const dateValue = ref("");
const emit = defineEmits(["update:value"]);

if (props.value) {
  dateValue.value = props.value;
}
</script>

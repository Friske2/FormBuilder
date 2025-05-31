<template>
  <el-time-select
    v-model="timeValue"
    v-bind="props.props"
    @change="emit('update:value', timeValue)"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  value: string | null;
  props: {
    [key: string]: any;
  };
}>();

const timeValue = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  timeValue.value = props.value;
}
</script>

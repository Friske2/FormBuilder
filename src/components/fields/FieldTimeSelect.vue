<template>
  <el-time-select
    v-model="timeValue"
    v-bind="props.props"
    @change="emit('update:value', timeValue)"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface FieldTimeSelectProp {
  value: string | null;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldTimeSelectProp>();

const timeValue = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  timeValue.value = props.value;
}
</script>

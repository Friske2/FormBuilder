<template>
  <el-time-select
    v-model="timeValue"
    v-bind="props.props"
    @change="emit('update:value', timeValue)"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

interface FieldTimeSelectProp {
  value: string | null;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldTimeSelectProp>();
const emit = defineEmits(["update:value"]);

const timeValue = ref(props.value ?? null);

watch(
  () => props.value,
  (newVal) => {
    if (newVal !== timeValue.value) {
      timeValue.value = newVal ?? null;
    }
  }
);
</script>

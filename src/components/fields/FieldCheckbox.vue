<template>
  <el-checkbox
    v-bind="props.props"
    v-model="checkboxValue"
    @change="emit('update:value', checkboxValue)"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

interface FieldCheckboxProp {
  value: string | null | number | boolean;
  props: {
    [key: string]: any;
  };
};

const props = defineProps<FieldCheckboxProp>();
const emit = defineEmits(["update:value"]);

const checkboxValue = ref(props.value ?? null);

watch(
  () => props.value,
  (newVal) => {
    if (newVal !== checkboxValue.value) {
      checkboxValue.value = newVal ?? null;
    }
  }
);
</script>

<template>
  <el-checkbox
    v-bind="props.props"
    v-model="checkboxValue"
    @change="emit('update:value', checkboxValue)"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface FieldCheckboxProp {
  value: string | null | number | boolean;
  props: {
    [key: string]: any;
  };
};

const props = defineProps<FieldCheckboxProp>();

const checkboxValue = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  checkboxValue.value = props.value;
}
</script>

<template>
  <el-input
    v-model="text"
    v-bind="props.props"
    @input="emit('update:value', text)"
  />
  <span>{{ props.props.desc }}</span>
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface FieldInputProp {
  value: string | null | number;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldInputProp>();
const text = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  text.value = props.value;
}
// Watch for changes in the input value and emit updates
</script>

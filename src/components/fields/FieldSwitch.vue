<template>
  <el-switch
    v-bind="props.props"
    v-model="switchValue"
    @change="emit('update:value', switchValue)"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps<{
  value: string | null | number | boolean;
  props: {
    [key: string]: any;
  };
}>();

const switchValue = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  switchValue.value = props.value;
}
</script>

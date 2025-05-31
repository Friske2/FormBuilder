<template>
  <el-switch
    v-bind="props.props"
    v-model="switchValue"
    @change="emit('update:value', switchValue)"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue";

interface FieldSwitchProp {
  value: string | null | number | boolean;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldSwitchProp>();

const switchValue = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  switchValue.value = props.value;
}
</script>

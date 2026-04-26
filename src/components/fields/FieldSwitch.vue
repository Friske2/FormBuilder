<template>
  <el-switch
    v-bind="props.props"
    v-model="switchValue"
    @change="emit('update:value', switchValue)"
  />
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";

interface FieldSwitchProp {
  value: string | null | number | boolean;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldSwitchProp>();
const emit = defineEmits(["update:value"]);

const switchValue = ref(props.value ?? null);

watch(
  () => props.value,
  (newVal) => {
    if (newVal !== switchValue.value) {
      switchValue.value = newVal ?? null;
    }
  }
);
</script>

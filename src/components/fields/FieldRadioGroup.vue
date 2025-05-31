<template>
  <el-radio-group
    v-bind="props.props"
    v-model="radio"
  >
    <el-radio v-for="item in props.props.options" :value="item.value">{{
      item.label
    }}</el-radio>
  </el-radio-group>
</template>

<script lang="ts" setup>
import { ref,onBeforeUpdate } from "vue";
onBeforeUpdate(() => {
  // @change="emit('update:value', checkbox)"
  emit("update:value", radio.value);
})
interface FieldRadioGroupProp {
  value: string | null | number;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldRadioGroupProp>();

const radio = ref();
const emit = defineEmits(["update:value"]);

if (props.value) {
  radio.value = props.value;
}
</script>

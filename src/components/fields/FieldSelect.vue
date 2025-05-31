<template>
  <el-select v-bind="props.props" v-model="value" @change="emit('update:value', value)">
    <el-option
      v-for="item in props.props.options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface FieldSelectProp {
  value: string | null | number;
  props: {
    [key: string]: any;
  };
}

const props = defineProps<FieldSelectProp>()

const value = ref()
const emit = defineEmits(['update:value'])

 if(props.value) {
      value.value = props.value;
  }
</script>
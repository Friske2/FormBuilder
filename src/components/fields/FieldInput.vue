<template>
   <el-input
    v-if="props.props.cleave"
    v-model="text"
    v-bind="props.props"
    @input="updateValue"
    v-cleave="props.props.cleave"
  />
  <el-input
    v-else
    v-model="text"
    v-bind="props.props"
    @input="updateValue"
  />
  <span>{{ props.props.desc }}</span>
</template>
<script lang="ts" setup>

import  useFieldInput from "../hooks/useFieldInput";
import { type FieldInputProp } from "../../types/FieldProps"

const props = defineProps<FieldInputProp>();
const emit = defineEmits(["update:value"]);
const { text,updateValue  } = useFieldInput(props, emit);

</script>

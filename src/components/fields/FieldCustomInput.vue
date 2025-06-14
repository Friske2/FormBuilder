<template>
  <el-input
    v-model="text"
    v-bind="props.props"
    v-cleave="props.props.cleave"
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

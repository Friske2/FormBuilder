<template>
  <el-form :model="form" label-width="120px" label-position="left">
    <el-form-item
      :rules="field.rules"
      v-for="field in fields"
      :label-postion="field.label.position"
      :label="field.label.text"
      :prop="field.code"
      :key="field.code"
    >
      <FieldItem 
        :value="form[field.code]"
        @update:value="form[field.code] = $event"
        :field="field" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive } from "vue";
import FieldItem from "./FieldItem.vue";
import exampleForm from "../mocks/exampleForm.json"
const form = reactive<Record<string, any>>({
  name: "Sample Value",
  region: null,
  resource: null,
  type: [],
  date1: "2023-10-01",
  time1: null,
  desc: null,
  isActive: true,
  isAccepted: false,
});
const fields = reactive(exampleForm);
</script>
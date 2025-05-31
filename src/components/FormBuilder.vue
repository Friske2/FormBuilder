<template>
  <el-form
    ref="warpElForm"
    :model="form"
    label-width="120px"
    label-position="left"
  >
    <el-form-item
      :rules="field.rules"
      v-for="field in fields"
      :label-postion="field.label.position"
      :label="field.label.text"
      :prop="field.code"
      :key="field.code"
    >
      <template v-if="field.is == 'col'">
        <FieldCol
          v-for="col in field.children"
          :key="col.code"
          :span="col.span"
        >
          <field-span :style="col.props.style" v-if="col.is == 'span'" :content="col.props.content" />
          <el-form-item
            v-else
            :rules="col.rules"
            :prop="col.code"
            :key="col.code"
          >
            <FieldItem
              :value="form[col.code]"
              @update:value="form[col.code] = $event"
              :field="col"
            />
          </el-form-item>
        </FieldCol>
      </template>
      <FieldItem
        v-else
        :value="form[field.code]"
        @update:value="form[field.code] = $event"
        :field="field"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import FieldItem from "./FieldItem.vue";
import exampleForm from "../mocks/exampleForm.json";
import FieldCol from "./FieldCol.vue";
import FieldSpan from "./fields/FieldSpan.vue";
import type { Schema } from "../types/Schema";
const form = reactive<Record<string, any>>({
  name: "Sample Value",
  region: null,
  resource: null,
  type: [],
  date1: "",
  time1: null,
  desc: null,
  isActive: true,
  isAccepted: false,
});
const warpElForm = ref<InstanceType<
  typeof import("element-plus")["ElForm"]
> | null>(null);
const submit = async () => {
  try {
    let payload = null;
    await warpElForm.value?.validate((valid: boolean) => {
      if (valid) {
        payload = { ...form };
      } else {
        console.error("Form validation failed");
      }
    });
    return payload;
  } catch (error) {
    console.error("Error during form submission:", error);
  }
};

// Expose the submit function to the parent component via ref
defineExpose({
  submit,
});
const fields = reactive<Schema>(exampleForm);
</script>

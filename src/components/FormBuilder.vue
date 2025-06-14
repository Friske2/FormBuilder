<template>
  <div class="my-2">
    <div class="title">Form builder</div>
    <div class="sub-title">
      This is a simple form builder using Element Plus and Vue 3. It allows you to create forms dynamically based on a JSON schema.
      <br />
      <strong>Note:</strong> The form does not submit to any backend service, but you can use the <code>submit</code> method to get the form data.
    </div>
  </div>
  <div>
    <el-form ref="warpElForm" :model="form" v-bind="config">
      <template v-for="field in warpField" :key="field.code">
        <show-if-wrapper :showIf="field.showIf" :formData="form" >
          <el-form-item :rules="field.rules" :label-postion="field.label.position" :label="field.label.text"
            :prop="field.code">
            <!-- render nasted field under col -->
            <template v-if="field.is == 'col'">
              <field-div :props="field.props">
                <field-col v-for="col in field.children" :key="col.code" :span="col.span">
                  <field-span :style="col.props.style" v-if="col.is == 'span'" :content="col.props.content" />
                  <el-form-item v-else :rules="col.rules" :prop="col.code" :key="col.code">
                    <field-item :value="form[col.code]" @update:value="form[col.code] = $event" :field="col" />
                  </el-form-item>
                </field-col>
              </field-div>
            </template>
            <!-- render field item -->
            <template v-else>
              <field-item :value="form[field.code]" @update:value="form[field.code] = $event" :field="field" />
            </template>
          </el-form-item>
        </show-if-wrapper>
      </template>
    </el-form>
    </div>
</template>
<script lang="ts" setup>
import { initStructure } from "./Form"
import { reactive, ref } from "vue";
import FieldItem from "./FieldItem.vue";
import exampleForm from "../mocks/creditCardForm.json";
import FieldCol from "./FieldCol.vue";
import FieldSpan from "./fields/FieldSpan.vue";
import type { Schema, FormConfig, FormType } from "../types/Schema";
import ShowIfWrapper from "./ShowIfWrapper.vue";
import { getHiddenFields } from '../components/Form'
import useValiatator from "./hooks/useValiatator"
import FieldDiv from "./fields/FieldDiv.vue";

const fields = reactive<Schema>(exampleForm);
const warpField = useValiatator(fields);
const form = reactive<FormType>(initStructure(fields));

const config = reactive<FormConfig>({
  labelWidth: "150px",
  labelPosition: "left",
  showMessage: true,
  inline: false,
  size: "default",
})

const warpElForm = ref<InstanceType<
  typeof import("element-plus")["ElForm"]
> | null>(null);

const submit = async () => {
  try {
    let payload = null;
    await warpElForm.value?.validate((valid: boolean) => {
      if (valid) {
        const hiddenFields = getHiddenFields(fields, form);
        hiddenFields.forEach((field) => {
          if(form.hasOwnProperty(field) && form[field]) {
            form[field] = null;
          }
        });
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
</script>

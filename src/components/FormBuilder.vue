<template>
  <el-form ref="warpElForm" :model="form" v-bind="config.config">
    <template v-for="field in warpField" :key="field.code">
      <show-if-wrapper :showIf="field.showIf" :formData="form">
        <el-form-item
          :rules="field.rules"
          :label-postion="field.label.position"
          :label="field.label.text"
          :prop="field.code"
        >
          <!-- render nasted field under col -->
          <template v-if="field.is == 'col'">
            <field-div :props="field.props">
              <field-col
                v-for="col in field.children"
                :key="col.code"
                :span="col.span"
              >
                <field-span
                  :style="col.props.style"
                  v-if="col.is == 'span'"
                  :content="col.props.content"
                />
                <el-form-item
                  v-else
                  :rules="col.rules"
                  :prop="col.code"
                  :key="col.code"
                >
                  <field-item
                    :value="form[col.code]"
                    @update:value="form[col.code] = $event"
                    :field="col"
                  />
                </el-form-item>
              </field-col>
            </field-div>
          </template>
          <!-- render field item -->
          <template v-else>
            <field-item
              :value="form[field.code]"
              @update:value="form[field.code] = $event"
              :field="field"
            />
          </template>
        </el-form-item>
      </show-if-wrapper>
    </template>
  </el-form>
</template>
<script lang="ts" setup>
import { initStructure } from "./Form";
import { reactive, ref } from "vue";
import FieldItem from "./FieldItem.vue";
import exampleForm from "../mocks/exampleForm.json";
import FieldCol from "./FieldCol.vue";
import FieldSpan from "./fields/FieldSpan.vue";
import type { Schema, FormType } from "../types/Schema";
import type { ValidationSchema,FormValidationConfig } from "../types/Validate";
import exampleValidate from '../mocks/exampleValidate.json'
import ShowIfWrapper from "./ShowIfWrapper.vue";
import useValiatator from "./hooks/useValiatator";
import FieldDiv from "./fields/FieldDiv.vue";
import useFieldEffects from "./hooks/useFieldEffect";
import useSubmit from "./hooks/useSubmit";
import useConfigForm from "./hooks/useConfigForm";
type ElFormInstance = InstanceType<typeof import("element-plus")["ElForm"]>;

const fields = reactive<Schema>(exampleForm);
const profileId = ref<string>("agent");
const validateProfile = ref<ValidationSchema>(exampleValidate).value[profileId.value];
const validateConfig = reactive<FormValidationConfig>(validateProfile);
const warpField = useValiatator(fields, validateConfig);
const form = reactive<FormType>(initStructure(fields));
const config = useConfigForm();

useFieldEffects(warpField, form);
const warpElForm = ref<ElFormInstance | null>(null);

const { submit } = useSubmit(warpElForm, fields, form);

// Expose the submit function to the parent component via ref
defineExpose({
  submit,
});
</script>

<template>
  <el-form ref="warpElForm" :model="form" v-bind="config.config">
    <template v-for="field in warpField" :key="field.code">
      <show-if-wrapper :showIf="field.showIf" :formData="form">
        <el-form-item
          :rules="field.rules"
          :label-position="field.label.position"
          :label="field.label.text"
          :prop="field.code"
        >
          <!-- render nested field under col -->
          <template v-if="field.is == 'col'">
            <field-col-item
              :field="field"
              :form="form"
              @update:form="(code, value) => (form[code] = value)"
            />
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
import { reactive, ref, watch } from "vue";
import FieldItem from "./FieldItem.vue";
import FieldColItem from "./FieldColItem.vue";
import type { Schema, FormType } from "../types/Schema";
import type { ValidationSchema, FormValidationConfig } from "../types/Validate";
import ShowIfWrapper from "./ShowIfWrapper.vue";
import useValidator from "./hooks/useValidator";
import useFieldEffects from "./hooks/useFieldEffects";
import useSubmit from "./hooks/useSubmit";
import useConfigForm from "./hooks/useConfigForm";
type ElFormInstance = InstanceType<(typeof import("element-plus"))["ElForm"]>;
const props = defineProps<{
  schema: Schema;
  validate?: ValidationSchema | null;
  profileId?: string | null;
  modelValue?: FormType;
  onFormChange?: (form: FormType) => void;
}>();
const emit = defineEmits<{ "update:modelValue": [form: FormType] }>();
const fields = reactive<Schema>(props.schema);
const validateConfig = reactive<FormValidationConfig>(
  (props.validate ?? {})[props.profileId ?? ""] ?? { requiredFields: [] },
);
const warpField = useValidator(fields, validateConfig);
const form = reactive<FormType>(initStructure(fields));
if (props.modelValue) {
  Object.assign(form, props.modelValue);
}
const initialFormState = JSON.parse(JSON.stringify(form));
const config = useConfigForm();
watch(
  form,
  () => {
    emit("update:modelValue", form);
    props.onFormChange?.(form);
  },
  { deep: true },
);
watch(
  () => [props.validate, props.profileId] as const,
  ([newValidate, newProfileId]) => {
    const newConfig = (newValidate ?? {})[newProfileId ?? ""] ?? {
      requiredFields: [],
    };
    Object.assign(validateConfig, newConfig);
    useValidator(fields, validateConfig);
  },
  { deep: true },
);

useFieldEffects(warpField, form);
const warpElForm = ref<ElFormInstance | null>(null);
const { advancedValidations } = validateConfig;
const { submit, reset } = useSubmit(
  warpElForm,
  fields,
  form,
  initialFormState,
  advancedValidations,
);

// Expose the submit function to the parent component via ref
defineExpose({
  submit,
  reset,
});
</script>

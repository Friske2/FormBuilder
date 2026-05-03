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
import { reactive, ref, watch } from "vue";
import FieldItem from "./FieldItem.vue";
import FieldCol from "./FieldCol.vue";
import FieldSpan from "./fields/FieldSpan.vue";
import type { Schema, FormType } from "../types/Schema";
import type { ValidationSchema, FormValidationConfig } from "../types/Validate";
import ShowIfWrapper from "./ShowIfWrapper.vue";
import useValiatator from "./hooks/useValiatator";
import FieldDiv from "./fields/FieldDiv.vue";
import useFieldEffects from "./hooks/useFieldEffect";
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
const warpField = useValiatator(fields, validateConfig);
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
    const newConfig = (newValidate ?? {})[newProfileId ?? ""] ?? { requiredFields: [] };
    Object.assign(validateConfig, newConfig);
    useValiatator(fields, validateConfig);
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

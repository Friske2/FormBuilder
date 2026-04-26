<template>
  <div class="container">
    <div class="my-2">
      <div class="title">Form builder</div>
      <div class="sub-title">
        This is a simple form builder using Element Plus and Vue 3. It allows
        you to create forms dynamically based on a JSON schema.
        <br />
        <strong>Note:</strong> The form does not submit to any backend service,
        but you can use the <code>submit</code> method to get the form data.
      </div>
    </div>
    {{ form }}
    <FormBuilder
      ref="elForm"
      :schema="fields"
      :validate="exampleValidate"
      :onFormChange="(form) => console.log('Form changed:', form)"
      profileId="agent"
      v-model="form"
    />
    <div class="flex justify-center">
      <el-button type="primary" @click="submitForm">Submit</el-button>
      <el-button type="primary" @click="resetForm">Reset</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import type { Schema } from "./types/Schema";
import exampleForm from "./mocks/exampleForm.json";
import FormBuilder from "./components/FormBuilder.vue";
import exampleValidate from "./mocks/exampleValidate.json";
interface FormBuilderRef {
  submit: () => Promise<any>;
  reset: () => void;
}
const fields = reactive<Schema>(exampleForm);
const form = ref({
  name: "test",
  email: "example@example.com",
  region: "beijing",
  resource: "Sponsorship",
  type: [1, 2],
  date1: "2026-01-01",
  time1: "12:00",
  isActive: true,
  desc: "This is a description",
  isAccepted: true,
  text: "This is a text",
});
const elForm = ref<FormBuilderRef | null>(null);
const resetForm = () => {
  console.log("Reset form", elForm.value);
  if (!elForm.value) return;
  elForm.value.reset();
};
const submitForm = async () => {
  if (!elForm.value) return;
  const result = await elForm?.value.submit();
  console.log("Submit result:", result);
  if (result.isSuccess) {
    console.log("Form submitted successfully:", result);
  } else {
    console.error("Form submission failed:", result.errorMessages);
  }
};
</script>

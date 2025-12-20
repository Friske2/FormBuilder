<template>
  <div class="container">
    <div class="my-2">
      <div class="title">Form builder</div>
      <div class="sub-title">
        This is a simple form builder using Element Plus and Vue 3. It allows you to create forms dynamically based on a JSON schema.
        <br />
        <strong>Note:</strong> The form does not submit to any backend service, but you can use the <code>submit</code> method to get the form data.
      </div>
    </div>
    <FormBuilder ref="elForm" />
    <div class="flex justify-center">
       <el-button type="primary" @click="submitForm">Submit</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import FormBuilder from './components/FormBuilder.vue';
interface FormBuilderRef {
  submit: () => Promise<any>;
}
const elForm = ref<FormBuilderRef | null>(null);
const submitForm = async () => {
  if (!elForm.value) return;
  const result = await elForm?.value.submit();
  console.log('Submit result:', result);
  if (result.isSuccess) {
    console.log('Form submitted successfully:', result);
  } else {
    console.error('Form submission failed:', result.errorMessages);
  }
};
</script>
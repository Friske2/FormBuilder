<template>
  <div class="container">
    <div class="title my-2">Form Builder Example</div>
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
  if (result) {
    console.log('Form submitted successfully:', result);
  } else {
    console.error('Form submission failed');
  }
};
</script>
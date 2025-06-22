import { type Ref } from "vue";
import { getHiddenFields } from '../Form';

export default function useSubmit(
  warpElForm: Ref<any>,
  fields: any,
  form: any
) {
  const submit = async () => {
    try {
      let payload = null;
      await warpElForm.value?.validate((valid: boolean) => {
        if (valid) {
          const hiddenFields = getHiddenFields(fields, form);
          hiddenFields.forEach((field: string) => {
            if (form.hasOwnProperty(field) && form[field]) {
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
  return { submit };
}
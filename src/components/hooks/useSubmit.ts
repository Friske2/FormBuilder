import { type Ref } from "vue";
import { getHiddenFields } from '../Form';
import type { AdvancedValidation } from "../../types/Validate";
import { advanceValidator } from "../../utils/advanceValidator";
export default function useSubmit(
  warpElForm: Ref<any>,
  fields: any,
  form: any,
  advancedValidations: AdvancedValidation[]
  
) {
  const handleAdvanceValidate = async () => {
    try {
      // Perform advanced validations
      for (const validation of advancedValidations) {
        const { message, validator, expression } = validation;
        if (validator === 'jsonata' && expression) {
          const payload = JSON.stringify(form);
          const isValid = await advanceValidator(payload, expression);
          console.log("Advanced validation result:", isValid);
          console.log("Validation message:", message);
          console.log("payload :", payload);
          if (!isValid) {
            console.error(message);
            return false; // Validation failed
          }
        }
      }
      return true; // All validations passed
    } catch (error) {
      console.error("Advanced validation error:", error);
      return false; // Return false if there's an error in validation
    }
  }
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
          // Perform advanced validations

          payload = { ...form };
        } else {
          console.error("Form validation failed");
        }
      });
      const isValid = await handleAdvanceValidate();
      if(!isValid) {
        console.error("Advanced validation failed");
        return null; // Return null if advanced validation fails
      }
      return payload;
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  return { submit };
}
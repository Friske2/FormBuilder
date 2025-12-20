import { type Ref } from "vue";
import { getHiddenFields } from '../Form';
import type { AdvancedValidation } from "../../types/Validate";
import { advanceValidator } from "../../utils/advanceValidator";
interface SubmitResult {
  isSuccess: boolean;
  errorMessages: string | null;
  result?: any;
}
export default function useSubmit(
  warpElForm: Ref<any>,
  fields: any,
  form: any,
  advancedValidations: AdvancedValidation[]
  
) {
  const handleAdvanceValidate = async (): Promise<SubmitResult> => {
    const response: SubmitResult = { isSuccess: true, errorMessages: null, result: null };
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
            response.isSuccess = false;
            response.errorMessages = message;
            return response; // Validation failed
          }
        }
      }
      return { isSuccess: true, errorMessages: null }; // All validations passed
    } catch (error) {
      console.error("Advanced validation error:", error);
      response.isSuccess = false;
      response.errorMessages = "Validation error";
      return response; // Return false if there's an error in validation
    }
  }
  const submit = async (): Promise<SubmitResult> => {
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
      const {isSuccess, errorMessages} = await handleAdvanceValidate();
      if(!isSuccess) {
        console.error("Advanced validation failed");
        return { isSuccess: false, errorMessages, result: null }; // Return null if advanced validation fails
      }
      return { isSuccess: true, errorMessages: null, result: payload };
    } catch (error) {
      console.error("Error during form submission:", error);
      return { isSuccess: false, errorMessages: "Error during form submission", result: null };
    }
  };
  return { submit };
}
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
    // Perform advanced validations
    for (const validation of advancedValidations) {
      const { message, validator, expression } = validation;
    
      if (validator === 'jsonata' && expression) {
        const payload = JSON.stringify(form);
        const isValid = await advanceValidator(payload, expression);
        console.log("Advanced validation result:", isValid);
        console.log("Validation message:", message);
        console.log("payload:", payload);
        
        if (!isValid) {
          console.error(message);
          return { isSuccess: false, errorMessages: message };
        }
      }
    }
    return { isSuccess: true, errorMessages: null };
  };

  const submit = async (): Promise<SubmitResult> => {
    try {
      // Check if form ref exists
      if (!warpElForm.value) {
        return { isSuccess: false, errorMessages: "Form reference not found", result: null };
      }

      // Validate form first
      const isValid = await new Promise<boolean>((resolve) => {
        warpElForm.value.validate((valid: boolean) => {
          resolve(valid);
        });
      });
      if (!isValid) {
        console.error("Form validation failed");
        return { isSuccess: false, errorMessages: "Form validation failed", result: null };
      }

      // Perform advanced validations
      const { isSuccess: advIsSuccess, errorMessages } = await handleAdvanceValidate();
      if (!advIsSuccess) {
        console.error("Advanced validation failed");
        return { isSuccess: false, errorMessages, result: null };
      }

      // Clear hidden fields AFTER validation passes
      const hiddenFields = getHiddenFields(fields, form);
      hiddenFields.forEach((field: string) => {
        if (form[field]) {
          form[field] = null;
        }
      });


      return { isSuccess: true, errorMessages: null, result: { ...form } };
    } catch (error) {
      console.error("Error during form submission:", error);
      return { 
        isSuccess: false, 
        errorMessages: error instanceof Error ? error.message : "Error during form submission", 
        result: null 
      };
    }
  };

  return { submit };
}
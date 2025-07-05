import { validateEmailWithForm, nonValidate } from "../../utils/valitator";
import type { Schema } from "../../types/Schema";
import type { FormValidationConfig } from "../../types/Validate";
interface MapFunctionRule {
  [key: string]: (rule: any, value: any, callback: Function) => void;
}

const mapFunctionRule: MapFunctionRule = {
  validateEmailWithForm: validateEmailWithForm,
};

const useValidator = (schema: Schema, validateProfileSchema: FormValidationConfig) => {

  const warpField = schema.map((fields) => {
    fields.rules.map((rule,index) => {
      if(index == 0) {
        const { requiredFields } = validateProfileSchema;
        rule.required = requiredFields.includes(fields.code);
      }
      if (typeof rule.validator == "string") {
        const funcName = rule.validator;
        if (mapFunctionRule.hasOwnProperty(funcName)) {
          rule.validator = mapFunctionRule[funcName];
        } else {
          rule.validator = nonValidate;
        }
      }
      return rule;
    });
    return fields;
  });
  return warpField;
};

export default useValidator;

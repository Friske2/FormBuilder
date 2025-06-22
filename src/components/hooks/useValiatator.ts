import { validateEmailWithForm, nonValidate } from "../../utils/valitator";
import type { Schema } from "../../types/Schema";

interface MapFunctionRule {
  [key: string]: (rule: any, value: any, callback: Function) => void;
}

const mapFunctionRule: MapFunctionRule = {
  validateEmailWithForm: validateEmailWithForm,
};

const useValidator = (schema: Schema) => {
  const warpField = schema.map((fields) => {
    fields.rules.map((rule) => {
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

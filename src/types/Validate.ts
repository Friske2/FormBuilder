// Validation types for form builder

// Base validation interface
export interface BaseValidation {
  fields: string[];
  validator: string;
  expression?: string; // Optional expression for JSONata validation
  args?: any[];
  message: string;
}

// Specific validation types
export interface SumEqualsValidation extends BaseValidation {
  validator: string;
  args: [number]; // The target sum value
}

export interface LessThanValidation extends BaseValidation {
  validator: string;
  args?: never; // No args needed for date comparison
}

export interface JsonataValidation extends BaseValidation {
  validator: string;
  expression: string; // JSONata expression for validation
}

// Union type for all validation types
export type AdvancedValidation = SumEqualsValidation | LessThanValidation | JsonataValidation;

// Form validation configuration
export interface FormValidationConfig {
  requiredFields: string[];
  advancedValidations: AdvancedValidation[];
}

// Complete validation schema
export interface ValidationSchema {
  [formKey: string]: FormValidationConfig;
}

// Example usage:
// const validationSchema: ValidationSchema = {
//   "A": {
//     "requiredFields": ["a", "b", "c"],
//     "advancedValidations": [
//       {
//         "fields": ["a", "b"],
//         "validator": "sumEquals",
//         "args": [200],
//         "message": "ค่ารวมของ A และ B ต้องเท่ากับ 200"
//       },
//       {
//         "fields": ["start", "end"],
//         "validator": "lessThan",
//         "message": "วันเริ่มต้นต้องก่อนวันสิ้นสุด"
//       }
//     ]
//   },
//   "B": {
//     "requiredFields": ["a"],
//     "advancedValidations": []
//   }
// };

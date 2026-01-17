import type { FormInstance } from 'element-plus'
import { ref } from 'vue';
export const ruleFormRef = ref<FormInstance>();
export function validateEmail(email: string): boolean {
    // Regular expression for validating an email address
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
export function validateEmailWithForm(rule: any, value: any, callback: Function) {
    const isRequired = rule.required;
    if(!isRequired && !value) return callback();
    if (value) {
        if (validateEmail(value)) {
            callback();
        } else {
            callback(new Error('Invalid email format'));
        }
    } else {
        callback(new Error('Email is required'));
    }
}

export function nonValidate(rule: any, value: any, callback: Function) {
    // This function does not perform any validation
    console.log('nonValidate', rule, value, callback);
    callback();
}
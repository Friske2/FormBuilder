import type {ShowIfExpression} from './condition'; 
export interface Label {
    text: string;
    position: string;
}
type FunctionValidator = (rule: any, value: any, callback: (error?: string) => void) => void;
export interface Rule {
    required?: boolean;
    message?: string;
    trigger?: string | string[]; 
    min?: number;
    max?: number;
    type?: string;
    validator?: string | FunctionValidator | null | undefined;
}

export interface Option {
    label: string;
    value: string | number;
}

export interface Props {
    placeholder?: string;
    desc?: string | null | undefined;
    filterable?: boolean;
    clearable?: boolean;
    options?: Option[];
    type?: string;
    format?: string;
    valueFormat?: string;
    start?: string;
    end?: string;
    step?: string;
    style?: StyleAttributes;
    rows?: number;
    label?: string;
    content?: string;
}

export interface FormField  {
    code: string;
    defaultValue?: any; // Default value for the field
    is: string;
    label: Label;
    props: Props;
    rules: Rule[];
    showIf?: ShowIfExpression; // Condition to show/hide the field
    children?: ColField[]; // For nested fields
    references?: string[]; // References to other fields
}
export interface ColField {
    span: number;
    defaultValue?: unknown;
    code: string;
    is: string;
    props: Props;
    rules: Rule[];
    showIf?: ShowIfExpression; // Condition to show/hide the field
}

export interface SpanField {
    is: "span";
    content: string;
    props?: {
        style?: StyleAttributes;
    };
    span?: number;
}

interface StyleAttributes extends Partial<CSSStyleDeclaration> {}

export type Schema = FormField[];
export type FormType = Record<string, any>
export interface FormConfig {
  labelWidth: string;
  labelPosition: "left" | "right" | "top";
  showMessage: boolean;
  inline: boolean;
  size: "default" | "small" | "large";
}
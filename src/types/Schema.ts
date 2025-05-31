import type {ShowIfExpression} from './condition'; 
export interface Label {
    text: string;
    position: string;
}

export interface Rule {
    required?: boolean;
    message?: string;
    trigger?: string;
    min?: number;
    max?: number;
    type?: string;
}

export interface Option {
    label: string;
    value: string | number;
}

export interface Props {
    placeholder?: string;
    desc?: string;
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
    is: string;
    label: Label;
    props: Props;
    rules: Rule[];
    showIf?: ShowIfExpression; // Condition to show/hide the field
    children?: ColField[]; // For nested fields
}
export interface ColField {
    span: number;
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
/* 
    [
    {
        "code": "name",
        "is": "input",
        "label": {
            "text": "Activity name",
            "position": "left"
        },
        "props": {
            "placeholder": "Enter activity name",
            "desc": "This is a description for the activity name field"
        },
        "rules": [
            {
                "required": true,
                "message": "Please input Activity name",
                "trigger": "change"
            },
            {
                "min": 3,
                "max": 20,
                "message": "Length should be 3 to 5",
                "trigger": "change"
            }
        ]
    },
    {
        "code": "region",
        "is": "select",
        "label": {
            "text": "Activity zone",
            "position": "left"
        },
        "props": {
            "placeholder": "Activity zone",
            "filterable": true,
            "clearable": true,
            "options": [
                {
                    "label": "Zone one",
                    "value": "shanghai"
                },
                {
                    "label": "Zone two",
                    "value": "beijing"
                }
            ]
        },
        "rules": [
            {
                "required": true,
                "message": "Please select Activity zone",
                "trigger": "change"
            }
        ]
    },
    {
        "code": "resource",
        "is": "radio-group",
        "label": {
            "text": "Resources",
            "position": "left"
        },
        "props": {
            "options": [
                {
                    "label": "Sponsorship",
                    "value": "Sponsorship"
                },
                {
                    "label": "Venue",
                    "value": "Venue"
                }
            ]
        },
        "rules": [
            {
                "required": true,
                "message": "Please select activity resource",
                "trigger": "change"
            }
        ]
    },
    {
        "code": "type",
        "is": "checkbox-group",
        "label": {
            "text": "Activity type",
            "position": "left"
        },
        "props": {
            "options": [
                {
                    "label": "Online activities",
                    "value": 1
                },
                {
                    "label": "Promotion activities",
                    "value": 2
                },
                {
                    "label": "Offline activities",
                    "value": 3
                },
                {
                    "label": "Simple brand exposure",
                    "value": 4
                }
            ]
        },
        "rules": [
            {
                "type": "array",
                "required": true,
                "message": "Please select at least one activity type",
                "trigger": "change"
            }
        ]
    },
    {
        "label": {
            "text": "Activity date",
            "position": "left"
        },
        "code": "date1",
        "is": "date-picker",
        "props": {
            "type": "date",
            "desc": "This date using DD-MM-YYYY format",
            "placeholder": "Pick a date",
            "format": "DD-MM-YYYY",
            "valueFormat": "YYYY-MM-DD"
        },
        "rules": [
            {
                "type": "date",
                "required": true,
                "message": "Please pick a date",
                "trigger": "change"
            }
        ]
    },
    {
        "label": {
            "text": "Activity time",
            "position": "left"
        },
        "code": "time1",
        "is": "time-select",
        "props": {
            "placeholder": "Pick a time",
            "start": "00:00",
            "end": "23:59",
            "step": "00:30",
            "style": {
                "width": "220px"
            }
        },
        "rules": [
            {
                "type": "string",
                "required": true,
                "message": "Please pick a time",
                "trigger": "change"
            }
        ]
    },
    {
        "code": "isActive",
        "is": "switch",
        "label": {
            "text": "Is active",
            "position": "left"
        },
        "props": {},
        "rules": [
            {
                "required": true,
                "message": "Please input activity form",
                "trigger": "blur"
            }
        ]
    },
    {
        "code": "desc",
        "is": "input",
        "label": {
            "text": "Activity form",
            "position": "left"
        },
        "props": {
            "placeholder": "Please input activity form",
            "type": "textarea",
            "rows": 4,
            "style": {
                "width": "100%"
            }
        },
        "rules": [
            {
                "required": true,
                "message": "Please input activity form",
                "trigger": "change"
            }
        ]
    },
    {
        "code": "isAccepted",
        "is": "checkbox",
        "label": {
            "text": " ",
            "position": "left"
        },
        "props": {
            "label": "You accept the terms and conditions"
        },
        "rules": [
            {
                "required": true,
                "message": "Please input activity form",
                "trigger": "blur"
            }
        ]
    },
    {
        "label": {
            "text": "Activity time range",
            "position": "left"
        },
        "code": "range",
        "is": "col",
        "children": [
            {
                "code": "date1",
                "is": "date-picker",
                "span": 11,
                "props": {
                    "type": "date",
                    "desc": "This date using DD-MM-YYYY format",
                    "placeholder": "Pick a date",
                    "format": "DD-MM-YYYY",
                    "valueFormat": "YYYY-MM-DD",
                    "style": {
                        "width": "100%"
                    }
                },
                "rules": [
                    {
                        "type": "date",
                        "required": true,
                        "message": "Please pick a date",
                        "trigger": "change"
                    }
                ]
            },
            {
                "is": "span",
                "content": "-",
                "props": {
                    "style": {
                        "textAlign": "center"
                    }
                },
                "span": 2
            },
            {
                "code": "time1",
                "is": "time-select",
                "span": 11,
                "props": {
                    "placeholder": "Pick a time",
                    "start": "00:00",
                    "end": "23:59",
                    "step": "00:30",
                    "style": {
                        "width": "220px"
                    }
                },
                "rules": [
                    {
                        "type": "string",
                        "required": true,
                        "message": "Please pick a time",
                        "trigger": "change"
                    }
                ]
            }
        ]
    }
]

*/

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
    children?: ColField[]; // For nested fields
}
export interface ColField {
    span: number;
    code: string;
    is: string;
    props: Props;
    rules: Rule[];
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
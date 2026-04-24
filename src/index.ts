import type { App, Plugin } from "vue";

// Styles - import CSS to bundle with library
import "./assets/daisy.css";
import "./assets/app.css";
import "./assets/custom.css";

// Main Component
import FormBuilder from "./components/FormBuilder.vue";

// Field Components
import FieldInput from "./components/fields/FieldInput.vue";
import FieldCustomInput from "./components/fields/FieldCustomInput.vue";
import FieldSelect from "./components/fields/FieldSelect.vue";
import FieldRadioGroup from "./components/fields/FieldRadioGroup.vue";
import FieldCheckboxGroup from "./components/fields/FieldCheckboxGroup.vue";
import FieldCheckbox from "./components/fields/FieldCheckbox.vue";
import FieldDatePicker from "./components/fields/FieldDatePicker.vue";
import FieldTimeSelect from "./components/fields/FieldTimeSelect.vue";
import FieldSwitch from "./components/fields/FieldSwitch.vue";
import FieldText from "./components/fields/FieldText.vue";
import FieldSpan from "./components/fields/FieldSpan.vue";
import FieldDiv from "./components/fields/FieldDiv.vue";

// Helper Components
import FieldItem from "./components/FieldItem.vue";
import FieldCol from "./components/FieldCol.vue";
import ShowIfWrapper from "./components/ShowIfWrapper.vue";

// Hooks
import useFieldInput from "./components/hooks/useFieldInput";
import useValidator from "./components/hooks/useValiatator";

// Utilities
import {
  initStructure,
  getHiddenFields,
  evaluateShowIf,
} from "./components/Form";
import {
  validateEmail,
  validateEmailWithForm,
  nonValidate,
} from "./utils/valitator";

// Types
export type {
  Schema,
  FormField,
  ColField,
  SpanField,
  FormType,
  FormConfig,
  Label,
  Rule,
  Option,
  Props,
} from "./types/Schema";

export type { FieldInputProp } from "./types/FieldProps";

export type {
  ShowIfOperator,
  ShowIfCondition,
  ShowIfGroup,
  ShowIfExpression,
} from "./types/condition";

// Export Components
export {
  // Main
  FormBuilder,
  // Fields
  FieldInput,
  FieldCustomInput,
  FieldSelect,
  FieldRadioGroup,
  FieldCheckboxGroup,
  FieldCheckbox,
  FieldDatePicker,
  FieldTimeSelect,
  FieldSwitch,
  FieldText,
  FieldSpan,
  FieldDiv,
  // Helpers
  FieldItem,
  FieldCol,
  ShowIfWrapper,
};

// Export Hooks
export { useFieldInput, useValidator };

// Export Utilities
export {
  initStructure,
  getHiddenFields,
  evaluateShowIf,
  validateEmail,
  validateEmailWithForm,
  nonValidate,
};

// Vue Plugin
const FormBuilderPlugin: Plugin = {
  install(app: App) {
    app.component("FormBuilder", FormBuilder);
    app.component("FieldInput", FieldInput);
    app.component("FieldCustomInput", FieldCustomInput);
    app.component("FieldSelect", FieldSelect);
    app.component("FieldRadioGroup", FieldRadioGroup);
    app.component("FieldCheckboxGroup", FieldCheckboxGroup);
    app.component("FieldCheckbox", FieldCheckbox);
    app.component("FieldDatePicker", FieldDatePicker);
    app.component("FieldTimeSelect", FieldTimeSelect);
    app.component("FieldSwitch", FieldSwitch);
    app.component("FieldText", FieldText);
    app.component("FieldSpan", FieldSpan);
    app.component("FieldDiv", FieldDiv);
    app.component("FieldItem", FieldItem);
    app.component("FieldCol", FieldCol);
    app.component("ShowIfWrapper", ShowIfWrapper);
  },
};

export default FormBuilderPlugin;

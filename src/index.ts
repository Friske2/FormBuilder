import type { App, Plugin } from "vue";

// Styles - import CSS to bundle with library
import "./assets/daisy.css";
import "./assets/app.css";
import "./assets/custom.css";


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
export { default as FormBuilder } from "./components/FormBuilder.vue";
export { default as FieldInput } from "./components/fields/FieldInput.vue";
export { default as FieldCustomInput } from "./components/fields/FieldCustomInput.vue";
export { default as FieldSelect } from "./components/fields/FieldSelect.vue";
export { default as FieldRadioGroup } from "./components/fields/FieldRadioGroup.vue";
export { default as FieldCheckboxGroup } from "./components/fields/FieldCheckboxGroup.vue";
export { default as FieldCheckbox } from "./components/fields/FieldCheckbox.vue";
export { default as FieldDatePicker } from "./components/fields/FieldDatePicker.vue";
export { default as FieldTimeSelect } from "./components/fields/FieldTimeSelect.vue";
export { default as FieldSwitch } from "./components/fields/FieldSwitch.vue";
export { default as FieldText } from "./components/fields/FieldText.vue";
export { default as FieldSpan } from "./components/fields/FieldSpan.vue";
export { default as FieldDiv } from "./components/fields/FieldDiv.vue";
export { default as FieldItem } from "./components/FieldItem.vue";
export { default as FieldCol } from "./components/FieldCol.vue";
export { default as ShowIfWrapper } from "./components/ShowIfWrapper.vue";

// Export Hooks
export { default as useFieldInput } from "./components/hooks/useFieldInput";
export { default as useValidator } from "./components/hooks/useValiatator";

// Export Utilities
export {
  initStructure,
  getHiddenFields,
  evaluateShowIf,
} from "./components/Form";
export {
  validateEmail,
  validateEmailWithForm,
  nonValidate,
} from "./utils/valitator";

// Vue Plugin
import FormBuilderComponent from "./components/FormBuilder.vue";
import FieldInputComponent from "./components/fields/FieldInput.vue";
import FieldCustomInputComponent from "./components/fields/FieldCustomInput.vue";
import FieldSelectComponent from "./components/fields/FieldSelect.vue";
import FieldRadioGroupComponent from "./components/fields/FieldRadioGroup.vue";
import FieldCheckboxGroupComponent from "./components/fields/FieldCheckboxGroup.vue";
import FieldCheckboxComponent from "./components/fields/FieldCheckbox.vue";
import FieldDatePickerComponent from "./components/fields/FieldDatePicker.vue";
import FieldTimeSelectComponent from "./components/fields/FieldTimeSelect.vue";
import FieldSwitchComponent from "./components/fields/FieldSwitch.vue";
import FieldTextComponent from "./components/fields/FieldText.vue";
import FieldSpanComponent from "./components/fields/FieldSpan.vue";
import FieldDivComponent from "./components/fields/FieldDiv.vue";
import FieldItemComponent from "./components/FieldItem.vue";
import FieldColComponent from "./components/FieldCol.vue";
import ShowIfWrapperComponent from "./components/ShowIfWrapper.vue";

const FormBuilderPlugin: Plugin = {
  install(app: App) {
    app.component("FormBuilder", FormBuilderComponent);
    app.component("FieldInput", FieldInputComponent);
    app.component("FieldCustomInput", FieldCustomInputComponent);
    app.component("FieldSelect", FieldSelectComponent);
    app.component("FieldRadioGroup", FieldRadioGroupComponent);
    app.component("FieldCheckboxGroup", FieldCheckboxGroupComponent);
    app.component("FieldCheckbox", FieldCheckboxComponent);
    app.component("FieldDatePicker", FieldDatePickerComponent);
    app.component("FieldTimeSelect", FieldTimeSelectComponent);
    app.component("FieldSwitch", FieldSwitchComponent);
    app.component("FieldText", FieldTextComponent);
    app.component("FieldSpan", FieldSpanComponent);
    app.component("FieldDiv", FieldDivComponent);
    app.component("FieldItem", FieldItemComponent);
    app.component("FieldCol", FieldColComponent);
    app.component("ShowIfWrapper", ShowIfWrapperComponent);
  },
};

export default FormBuilderPlugin;

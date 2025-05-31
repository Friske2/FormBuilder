<template>
    <component
    :is="mapComponent(field)"
    :value="props.value"
     @update:value="$emit('update:value', $event)"
    :props="props.field.props"
    />
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import FieldInput from "./fields/FieldInput.vue";
import FieldSelect from "./fields/FieldSelect.vue";
import FieldRadioGroup from "./fields/FieldRadioGroup.vue";
import FieldCheckboxGroup from "./fields/FieldCheckboxGroup.vue";
import FieldDatePicker from "./fields/FieldDatePicker.vue";
import FieldTimeSelect from "./fields/FieldTimeSelect.vue";
import FieldSwitch from "./fields/FieldSwitch.vue";
import FieldCheckbox from "./fields/FieldCheckbox.vue";
const props = defineProps<{
  value: any;
  field: {
    code: string;
    is: string;
    props?: Record<string, any>;
  };
}>();
const mapComponent = (field: any) => {
  const map: Record<string, any> = {
    input: FieldInput,
    select: FieldSelect,
    switch: FieldSwitch,
    checkbox: FieldCheckbox,
    "checkbox-group": FieldCheckboxGroup,
    "radio-group": FieldRadioGroup,
    "date-picker": FieldDatePicker,
    "time-select": FieldTimeSelect,
  };

  return map[field.is] || field.is;
};
</script>
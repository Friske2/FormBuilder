<template>
  <field-div :props="field.props">
    <field-col v-for="col in field.children" :key="col.code" :span="col.span">
      <field-span
        :style="col.props.style"
        v-if="col.is == 'span'"
        :content="col.props.content"
      />
      <el-form-item v-else :rules="col.rules" :prop="col.code" :key="col.code">
        <field-item
          :value="form[col.code]"
          @update:value="emit('update:form', col.code, $event)"
          :field="col"
        />
      </el-form-item>
    </field-col>
  </field-div>
</template>

<script lang="ts" setup>
import FieldDiv from "./fields/FieldDiv.vue";
import FieldCol from "./FieldCol.vue";
import FieldSpan from "./fields/FieldSpan.vue";
import FieldItem from "./FieldItem.vue";
import type { FormField, FormType } from "../types/Schema";

defineProps<{
  field: FormField;
  form: FormType;
}>();

const emit = defineEmits<{
  "update:form": [code: string, value: any];
}>();
</script>

<script setup lang="ts">
import { computed } from 'vue'

type ShowIfOperator = '==' | '!=' | 'includes' | '!includes' | '>' | '<' | '>=' | '<='

interface ShowIfCondition {
  field?: string
  operator?: ShowIfOperator
  value?: any
}

interface ShowIfGroup {
  and?: ShowIfExpression[]
  or?: ShowIfExpression[]
}

type ShowIfExpression = ShowIfCondition | ShowIfGroup
const emit = defineEmits(["clear"]);
const props = defineProps<{
  showIf?: ShowIfExpression 
  formData: Record<string, any>
}>()

function evaluateShowIf(expr: ShowIfExpression, formData: Record<string, any>): boolean {
  if (!expr) return true
  if ('field' in expr && 'operator' in expr) {
    const fieldValue = expr.field ? formData[expr.field] : undefined
    switch (expr.operator) {
      case '==': return fieldValue === expr.value
      case '!=': return fieldValue !== expr.value
      case '>': return fieldValue > expr.value
      case '<': return fieldValue < expr.value
      case '>=': return fieldValue >= expr.value
      case '<=': return fieldValue <= expr.value
      case 'includes':
        if (Array.isArray(fieldValue)) return fieldValue.includes(expr.value)
        return false
      case '!includes':
        if (Array.isArray(fieldValue)) return !fieldValue.includes(expr.value)
        return false
      default:
        return false
    }
  }

  if ('and' in expr) {
    return expr.and?.every(sub => evaluateShowIf(sub, formData)) ?? true
  }

  if ('or' in expr) {
    return expr.or?.some(sub => evaluateShowIf(sub, formData)) ?? false
  }

  return true
}

const isVisible = computed(() => {
    if (!props.showIf) return true
    var isShow = evaluateShowIf(props.showIf, props.formData)
    return isShow
})


</script>

<template>
  <template v-if="isVisible">
    <slot />
  </template>
</template>

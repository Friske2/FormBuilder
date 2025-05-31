<script setup lang="ts">
import { computed, watch } from 'vue'

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
  fieldsToClear?: string[] 
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

// 🧠 ตรวจจับว่าเมื่อไม่แสดง แล้ว clear ค่า
watch(isVisible, (visible) => {
  if (!visible) {
    const toClear = props.fieldsToClear ?? detectFieldCodes(props.showIf ?? {})
    toClear.forEach(field => {
      if (field in props.formData) {
        // emit clear value 
        console.log(field)
        emit('clear', { field, value: null })
      }
    })
  }
})


// 🔍 Utility: ดึงชื่อ field ทั้งหมดจาก showIf expression
function detectFieldCodes(expr: ShowIfExpression): string[] {
  const result: string[] = []
  if ('field' in expr && typeof expr.field === 'string') {
    result.push(expr.field)
  } else if ('and' in expr && Array.isArray(expr.and)) {
    expr.and.forEach(e => result.push(...detectFieldCodes(e)))
  } else if ('or' in expr && Array.isArray(expr.or)) {
    expr.or.forEach(e => result.push(...detectFieldCodes(e)))
  }
  return [...new Set(result)]
}
</script>

<template>
  <template v-if="isVisible">
    <slot />
  </template>
</template>

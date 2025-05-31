<script setup lang="ts">
import { evaluateShowIf } from './Form'
import type { ShowIfOperator } from '../types/condition'
import { computed } from 'vue'

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

// 👇 รายชื่อ operator ที่รองรับ
export type ShowIfOperator = '==' | '!=' | 'includes' | '!includes' | '>' | '<' | '>=' | '<='

// 👇 เงื่อนไขแบบเดี่ยว
export interface ShowIfCondition {
  field?: string
  operator?: ShowIfOperator
  value?: any
}

// 👇 เงื่อนไขแบบกลุ่ม (AND / OR)
export interface ShowIfGroup {
  and?: ShowIfExpression[]
  or?: ShowIfExpression[]
}

// 👇 union type รวมทุกกรณีที่เป็นไปได้
export type ShowIfExpression = ShowIfCondition | ShowIfGroup

// 👇 ใช้ใน schema field
// export interface FieldSchema {
//   code: string
//   is: string
//   label?: {
//     text: string
//     position?: 'left' | 'top'
//   }
//   props?: Record<string, any>
//   rules?: any[]
//   showIf?: ShowIfExpression
//   children?: FieldSchema[] // สำหรับ layout เช่น col
// }

export function evaluateShowIf(expr: ShowIfExpression, formData: Record<string, any>): boolean {
  // ✅ Base case: single condition
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

  // ✅ Recursive group evaluation
  if ('and' in expr && Array.isArray(expr.and)) {
    return expr.and.every(subExpr => evaluateShowIf(subExpr, formData))
  }

  if ('or' in expr && Array.isArray(expr.or)) {
    return expr.or.some(subExpr => evaluateShowIf(subExpr, formData))
  }

  return true // default fallback
}
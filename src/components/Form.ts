import type { ShowIfExpression } from '../types/condition'
interface SchemaItem {
  code?: string
  is: string
  showIf?: ShowIfExpression
  children?: SchemaItem[]
}
export function getHiddenFields(
  schema: SchemaItem[],
  formData: Record<string, any>
): string[] {
  const hiddenFields: string[] = []

  for (const item of schema) {
    const visible = item.showIf
      ? evaluateShowIf(item.showIf, formData)
      : true

    if (!visible) {
      // หากมี code แสดงว่า field นี้ต้องถูกล้าง
      if (item.code) hiddenFields.push(item.code)

      // และหากมี children ให้เก็บทุก code ของ children ด้วย
      if (item.children) {
        const childCodes = getAllChildCodes(item.children)
        hiddenFields.push(...childCodes)
      }
    } else if (item.children) {
      // ถ้าตัวเอง visible แต่มี children ซ้อนอยู่ ต้องเช็คต่อ
      const childHidden = getHiddenFields(item.children, formData)
      hiddenFields.push(...childHidden)
    }
  }

  return hiddenFields
}

function getAllChildCodes(children: SchemaItem[]): string[] {
  const codes: string[] = []
  for (const child of children) {
    if (child.code) codes.push(child.code)
    if (child.children) codes.push(...getAllChildCodes(child.children))
  }
  return codes
}

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
import type { ShowIfExpression } from '../types/condition'
import { evaluateShowIf } from '../types/condition'
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
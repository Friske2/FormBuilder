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

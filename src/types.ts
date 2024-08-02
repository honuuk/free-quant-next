export type ValueFactor = 'NET_INCOME' | 'TOTAL_SALES' | 'OPERATION_PROFIT' | 'GROSS_PROFIT'

export type IncomeStatement = {
  companyCode: string
  company: string
  market: string
  sector: string
  settlementMonth: string
  settlementDay: string
  currency: string
} & Partial<Record<ValueFactor, number>>

export type Year = `${number}`
export type Quarter = '1Q' | '2Q' | '3Q' | '4Q'
export type YearQuarterString = `${Year} - ${Quarter}`

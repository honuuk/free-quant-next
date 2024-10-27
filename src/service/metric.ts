import { IncomeStatement, Quarter, Year } from '@/types'

import * as api from './firestore'

const COLLECTION_NAME = 'metrics'

export async function create(data: Array<IncomeStatement & { year: Year; quarter: Quarter }>) {
  await api.createAll(COLLECTION_NAME, data)
}

export async function getAllByYearQuarter(
  year: Year,
  quarter: Quarter
): Promise<Array<IncomeStatement & { year: Year; quarter: Quarter }>> {
  return api.queryAll(COLLECTION_NAME, { year, quarter })
}

import { format, isFuture as isFutureFns } from 'date-fns'

import { Quarter, Year, YearQuarterString } from '@/types'

export const QUARTERS: Quarter[] = ['1Q', '2Q', '3Q', '4Q']

export function parseYearQuarter(date: Date): YearQuarterString {
  return `${parseYear(date)}-${parseQuarter(date)}` as YearQuarterString
}

export function parseYear(date: Date): string {
  return format(date, 'yyyy')
}

export function subYear(year: Year) {
  return (parseInt(year) - 1).toString() as Year
}
export function addYear(year: Year) {
  return (parseInt(year) + 1).toString() as Year
}

export function isThisYear(year: Year) {
  return year === format(new Date(), 'yyyy')
}

export function parseQuarter(date: Date): Quarter {
  return (format(date, 'Q') + 'Q') as Quarter
}

export function isFuture(year: Year, quarter: Quarter) {
  const quarterNum = parseInt(quarter)
  const month = (quarterNum - 1) * 3 + 1

  return isFutureFns(new Date(Number(year), month, 1))
}

import { redirect } from 'next/navigation'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IncomeStatement, Quarter, Year } from '@/types'
import { parseQuarter, parseYear } from '@/util/date'

import QuarterPicker from './ui/QuarterPicker'
import FactorTabs from './ui/FactorTabs'

import data from '../../data/output/2024/1Q/value.json'

function formatAmount(amount?: number) {
  if (!amount) return ''
  return '₩' + amount.toLocaleString()
}

export default function Screener({ searchParams }: { searchParams: Record<string, string> }) {
  const { year: yearParam, quarter } = searchParams
  const year = Number(yearParam)
  console.log(year, quarter)

  if (!year || !['1Q', '2Q', '3Q', '4Q'].includes(quarter)) {
    redirect(`/admin?year=${parseYear(new Date())}&quarter=${parseQuarter(new Date())}`)
  }

  const incomeStatements = Object.values(data)
    .map((json) => json as IncomeStatement)
    .sort((a, b) => a.company.localeCompare(b.company))

  return (
    <>
      <div className="space-between flex items-center mb-4">
        <FactorTabs />
        <div className="ml-auto">
          <QuarterPicker year={year.toString() as Year} quarter={quarter as Quarter} />
        </div>
      </div>
      <Table>
        <TableCaption>Factor</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>회사 코드</TableHead>
            <TableHead>회사명</TableHead>
            <TableHead>시장구분</TableHead>
            <TableHead>섹터</TableHead>
            <TableHead>당기순이익</TableHead>
            <TableHead>영업이익</TableHead>
            <TableHead>매출액</TableHead>
            <TableHead>매출총이익</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomeStatements.map((data) => (
            <TableRow key={data.companyCode}>
              <TableCell>{data.companyCode}</TableCell>
              <TableCell className="font-medium">{data.company}</TableCell>
              <TableCell>{data.market}</TableCell>
              <TableCell>{data.sector}</TableCell>
              <TableCell>{formatAmount(data.NET_INCOME)}</TableCell>
              <TableCell>{formatAmount(data.OPERATION_PROFIT)}</TableCell>
              <TableCell>{formatAmount(data.TOTAL_SALES)}</TableCell>
              <TableCell>{formatAmount(data.GROSS_PROFIT)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

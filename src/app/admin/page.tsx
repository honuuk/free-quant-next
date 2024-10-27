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
import UploadFile from './ui/UploadFile'
import * as metric from '@/service/metric'

function formatAmount(amount?: number) {
  if (!amount) return ''
  return '₩ ' + amount.toLocaleString()
}

export default async function Admin({ searchParams }: { searchParams: Record<string, string> }) {
  const { year: yearParam, quarter } = searchParams
  const year = Number(yearParam)

  if (!year || !['1Q', '2Q', '3Q', '4Q'].includes(quarter)) {
    redirect(`/admin?year=${parseYear(new Date())}&quarter=${parseQuarter(new Date())}`)
  }

  const metrics = await metric.getAllByYearQuarter(year.toString() as Year, quarter as Quarter)

  return (
    <>
      <div className="space-between flex items-center mb-4">
        <FactorTabs />
        <div className="ml-auto flex items-center gap-2">
          <UploadFile year={year.toString() as Year} quarter={quarter as Quarter} />
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
          {metrics
            .sort((a, b) => (a.company > b.company ? 1 : -1))
            .map((metric) => (
              <TableRow key={metric.companyCode}>
                <TableCell>{metric.companyCode}</TableCell>
                <TableCell className="font-medium">{metric.company}</TableCell>
                <TableCell>{metric.market}</TableCell>
                <TableCell>{metric.sector}</TableCell>
                <TableCell className={!metric.NET_INCOME ? 'border-2 border-red-500' : ''}>
                  {formatAmount(metric.NET_INCOME)}
                </TableCell>
                <TableCell className={!metric.OPERATION_PROFIT ? 'border-2 border-red-500' : ''}>
                  {formatAmount(metric.OPERATION_PROFIT)}
                </TableCell>
                <TableCell className={!metric.TOTAL_SALES ? 'border-2 border-red-500' : ''}>
                  {formatAmount(metric.TOTAL_SALES)}
                </TableCell>
                <TableCell className={!metric.GROSS_PROFIT ? 'border-2 border-red-500' : ''}>
                  {formatAmount(metric.GROSS_PROFIT)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}

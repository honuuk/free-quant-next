'use client'

import { useState } from 'react'
import { UploadIcon } from 'lucide-react'
import iconv from 'iconv-lite'

import { IncomeStatement, Quarter, Year } from '@/types'
import * as metric from '@/service/metric'
import { cn } from '@/util/shadcn'

import FormDialog from '@/components/form/FormDialog'
import FileInput from '@/components/form/FileInput'
import { Button } from '@/components/ui/button'
import { createMetric } from '@/app/api/metric/route'

interface Props {
  year: Year
  quarter: Quarter
}

interface FormValues {
  incomeStatement: File
  incomeStatementInclude: File
}

export default function UploadFile({ year, quarter }: Props) {
  const [opened, setOpened] = useState(false)

  const handleClose = () => setOpened(false)

  const handleSubmit = async ({ incomeStatement, incomeStatementInclude }: FormValues) => {
    const metrics = await parseFile(incomeStatement, incomeStatementInclude)
    await createMetric({ year, quarter, metrics })
  }

  return (
    <div className={cn('grid gap-2')}>
      <Button
        id="date"
        variant="secondary"
        className="w-[120px] h-[40px] justify-start text-left font-normal"
        onClick={() => setOpened(true)}
      >
        <UploadIcon className="mr-2 h-4 w-4" />
        파일 업로드
      </Button>
      {opened && (
        <FormDialog<FormValues>
          title="파일 업로드"
          description={`${year} - ${quarter} 손익계산서를 업로드 해주세요.`}
          close={handleClose}
          onSubmit={handleSubmit}
        >
          {(form) => (
            <>
              <FileInput form={form} label="손익계산서" name="incomeStatement" />
              <FileInput form={form} label="손익계산서 (연결)" name="incomeStatementInclude" />
            </>
          )}
        </FormDialog>
      )}
    </div>
  )
}

async function parseFile(pl: File, plInclude: File): Promise<Record<string, IncomeStatement>> {
  const data = iconv.decode(Buffer.from(await pl.arrayBuffer()), 'EUC-KR')
  const dataInclude = iconv.decode(Buffer.from(await plInclude.arrayBuffer()), 'EUC-KR')

  const lines = data.split('\r\n')
  const includeLines = dataInclude.split('\r\n')

  return [...lines, ...includeLines]
    .map(parseLine)
    .filter(({ market }) => market === '유가증권시장상장법인')
    .reduce((acc, data) => {
      const valueFactor = nameToValueFactor(data.name)

      if (!valueFactor) return acc
      return {
        ...acc,
        [data.company]: {
          ...(acc[data.company] || data),
          [valueFactor]: data.value ? Number(data.value.replaceAll(',', '')) : data.value,
          name: undefined,
          value: undefined,
        },
      }
    }, {} as Record<string, IncomeStatement>)
}

function parseLine(line: string) {
  const [
    ,
    companyCode,
    company,
    market,
    ,
    sector,
    settlementMonth,
    settlementDay,
    ,
    currency,
    ,
    name,
    value,
  ] = line.split('\t').map((str) => str.trim())
  return {
    companyCode,
    company,
    market,
    sector,
    settlementMonth,
    settlementDay,
    currency,
    name,
    value,
  }
}

function nameToValueFactor(name: string) {
  if (name.includes('당기순이익')) return 'NET_INCOME'
  if (name.includes('분기순이익')) return 'NET_INCOME'
  if (name.includes('총포괄손익')) return 'NET_INCOME'
  if (name.includes('매출액')) return 'TOTAL_SALES'
  if (name === '매출') return 'TOTAL_SALES'
  if (name.includes('영업이익')) return 'OPERATION_PROFIT'
  if (name.includes('매출총이익')) return 'GROSS_PROFIT'
  return
}

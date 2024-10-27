import * as metric from '@/service/metric'
import { IncomeStatement, Quarter, Year } from '@/types'
import { NextRequest } from 'next/server'

interface CreateMetric {
  year: Year
  quarter: Quarter
  metrics: Record<string, IncomeStatement>
}

export async function POST(req: Request) {
  const { year, quarter, metrics }: CreateMetric = await req.json()

  await metric.create(Object.values(metrics).map((metric) => ({ ...metric, year, quarter })))

  return Response.json({})
}

export async function createMetric(payload: CreateMetric) {
  return fetch('/api/metric', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

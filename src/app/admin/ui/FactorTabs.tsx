'use client'
import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {}

const FACTORS = ['quality', 'growth', 'acceleration']
const factorLabelMap: Record<string, string> = {
  quality: '가치',
  growth: '성장',
  acceleration: '가속',
}

const FactorTabs: React.FC<Props> = () => {
  const [factor, setFactor] = useState('quality')
  return (
    <Tabs
      value={factor}
      className="space-y-4 w-full sm:w-fit"
      onValueChange={(value: string) => setFactor(value)}
    >
      <TabsList className="w-full sm:w-fit">
        {FACTORS.map((value) => (
          <TabsTrigger className="flex-1 sm:w-20" key={value} value={value}>
            {factorLabelMap[value]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default FactorTabs

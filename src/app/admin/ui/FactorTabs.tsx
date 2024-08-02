'use client'
import { useState } from 'react'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Props {}

const TYPES = ['value', 'growth', 'acceleration']
const typeLabelMap: Record<string, string> = {
  value: '가치',
  growth: '성장',
  acceleration: '가속',
}

const FactorTabs: React.FC<Props> = () => {
  const [type, setType] = useState('quality')
  return (
    <Tabs
      value={type}
      className="space-y-4 w-full sm:w-fit"
      onValueChange={(value: string) => setType(value)}
    >
      <TabsList className="w-full sm:w-fit">
        {TYPES.map((type) => (
          <TabsTrigger className="flex-1 sm:w-20" key={type} value={type}>
            {typeLabelMap[type]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default FactorTabs

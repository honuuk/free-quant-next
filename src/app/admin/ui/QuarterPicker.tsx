'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

import {
  addYear,
  isFuture,
  isThisYear,
  parseQuarter,
  parseYear,
  QUARTERS,
  subYear,
} from '@/util/date'
import { cn } from '@/util/shadcn'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button, buttonVariants } from '@/components/ui/button'
import { Quarter, Year } from '@/types'

interface Props {
  year: Year
  quarter: Quarter
}

export default function QuarterPicker({ year, quarter }: Props) {
  const router = useRouter()
  const [currentYear, setCurrentYear] = useState<Year>(year)

  const handleClickPrev = () => setCurrentYear(subYear)
  const handleClickNext = () => setCurrentYear(addYear)

  return (
    <div className={cn('grid gap-2')}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className="w-[120px] h-[40px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {`${currentYear} ${quarter}`}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <div className="p-3">
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <div className="space-y-4">
                <div
                  className="relative flex items-center justify-center pt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div
                    className="text-sm font-medium"
                    aria-live="polite"
                    role="presentation"
                    id="month-picker"
                  >
                    {currentYear}
                  </div>
                  <div className="flex items-center space-x-1">
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'h-7 w-7 cursor-pointer bg-transparent p-0 opacity-50 hover:opacity-100',
                        'absolute left-1'
                      )}
                      onClick={handleClickPrev}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </div>
                    <div
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'h-7 w-7 cursor-pointer bg-transparent p-0 opacity-50 hover:opacity-100',
                        'absolute right-1',
                        isThisYear(currentYear) && 'pointer-events-none bg-slate-100'
                      )}
                      onClick={handleClickNext}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <div className="grid w-full grid-cols-3 gap-2">
                  {QUARTERS.map((currentQuarter) => (
                    <div
                      key={currentQuarter}
                      className="relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md dark:[&:has([aria-selected])]:bg-slate-800"
                    >
                      <div
                        className={cn(
                          'cursor-pointer inline-flex h-9 w-16 items-center justify-center rounded-md p-0 text-sm font-normal ring-offset-white transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 aria-selected:opacity-100 dark:ring-offset-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 dark:focus-visible:ring-slate-800',
                          currentYear === year &&
                            currentQuarter === quarter &&
                            'bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
                          isFuture(currentYear, currentQuarter) && 'pointer-events-none opacity-50'
                        )}
                        onClick={() =>
                          router.push(`/admin?year=${currentYear}&quarter=${currentQuarter}`)
                        }
                      >
                        <PopoverClose>{currentQuarter}</PopoverClose>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

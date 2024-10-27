import { Loader2 } from 'lucide-react'

import { cn } from '@/util/shadcn'

const Spinner = ({ className }: { className?: string }) => {
  return (
    <Loader2
      className={cn(
        'absolute mx-auto mt-[100px] left-0 right-0 h-16 w-16 text-primary/60 animate-spin',
        className
      )}
    />
  )
}

export default Spinner

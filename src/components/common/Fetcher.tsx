import { createContext } from 'react'
import { useQuery } from '@tanstack/react-query'

import Spinner from '../ui/spinner'

export const RefetchContext = createContext<() => Promise<any>>(async () => '')

interface Props<T> {
  fetcher: () => Promise<T>
  children: (data: T) => React.ReactNode
}

function Fetcher<T extends object>({ fetcher, children }: Props<T>) {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: [location.href],
    queryFn: fetcher,
  })

  if (isPending) return <Spinner />

  if (isError) return <div>{JSON.stringify(error)}</div>

  return <RefetchContext.Provider value={refetch}>{children(data)}</RefetchContext.Provider>
}

export default Fetcher

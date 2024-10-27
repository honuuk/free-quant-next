import { useContext, useState } from 'react'
import { DefaultValues, UseFormReturn, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodObject } from 'zod'

import { useToast } from '../../hooks/use-toast'

import { RefetchContext } from '../common/Fetcher'
import { Button } from '../ui/button'
import Spinner from '../ui/spinner'
import { Form } from '../ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'

interface Props<T extends Record<string, any>> {
  title: string
  description?: string
  close: () => void
  validate?: ZodObject<T>
  initialValues?: T
  onSubmit: (formValues: T) => Promise<void>
  children: (form: UseFormReturn<T, any, undefined>) => React.ReactNode
}

export default function FormDialog<FormValues extends Record<string, any>>({
  title,
  description,
  close,
  validate,
  initialValues,
  onSubmit,
  children,
}: Props<FormValues>) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const refetch = useContext(RefetchContext)

  const form = useForm<FormValues>({
    ...(validate ? { resolver: zodResolver(validate) } : {}),
    defaultValues: initialValues as DefaultValues<FormValues> | undefined,
  })

  const onFormSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true)
      await onSubmit(values)
      await refetch()
      toast({
        title: '정상적으로 처리되었습니다.',
      })
      close()
    } catch (e) {
      toast({
        variant: 'destructive',
        title: '에러가 발생했습니다.',
      })
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onFormSubmit)}>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {children(form)}
            <DialogFooter>
              <Button type="button" onClick={close}>
                취소
              </Button>
              <Button type="submit">저장</Button>
            </DialogFooter>
          </form>
        </Form>
        {isLoading && <Spinner />}
      </DialogContent>
    </Dialog>
  )
}

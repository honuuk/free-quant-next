import { Path, UseFormReturn } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

interface Props<T extends Record<string, any>> {
  form: UseFormReturn<T, any, undefined>
  label: string
  name: Path<T>
  description?: string
}

export default function NumberInput<T extends Record<string, any>>({
  form,
  label,
  name,
  description,
}: Props<T>) {
  const parse = (value: string) => Number(value.replaceAll(',', ''))
  const format = (value: number) => value.toLocaleString()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={format(field.value)}
              onChange={(e) => {
                const value = parse(e.target.value)
                if (Number.isNaN(value)) return
                field.onChange(value)
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

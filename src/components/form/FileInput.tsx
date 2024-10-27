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

export default function FileInput<T extends Record<string, any>>({
  form,
  label,
  name,
  description,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="file"
              {...fieldProps}
              onChange={(e) => {
                onChange(e.target.files && e.target.files[0])
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

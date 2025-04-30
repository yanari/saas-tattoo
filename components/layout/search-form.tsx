'use client'

import { Input } from '../ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { FormField, Form, FormItem, FormControl, FormMessage } from '../ui/form'
import { Button } from '../ui/button'

const formSchema = z.object({
  search: z.string().trim().min(1),
})

export function SearchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  })
  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/studios?search=${values.search}`)
  }

  return (
    <Form {...form}>
      <form
        className="flex items-center gap-4 px-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Busque um estúdio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Procurar</Button>
      </form>
    </Form>
  )
}

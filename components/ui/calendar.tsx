'use client'

import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import 'react-day-picker/style.css'

type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  disabledDays?: Date[]
}

function Calendar({
  className,
  showOutsideDays = true,
  disabledDays = [],
  ...props
}: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={disabledDays}
      className={cn('p-3', className)}
      classNames={{
        today: 'text-primary border-primary', // Add a border to today's date
        selected: 'bg-primary border-primary text-white', // Highlight the selected day
        root: `${defaultClassNames.root} w-full px-4`, // Add a shadow to the root element
        chevron: 'text-primary fill-primary', // Change the color of the chevron
        months: 'w-full relative',
        month_caption: `${defaultClassNames.month_caption} capitalize`,
        month_grid: 'w-full',
        day_button: 'w-10 h-8',
        focused: 'rounded-sm',
      }}
      {...props}
    />
  )
}

export { Calendar }

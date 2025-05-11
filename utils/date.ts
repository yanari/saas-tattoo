import { format } from 'date-fns'

export function formatDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

interface DateAvailability {
  startTime: string
  endTime: string
  isAvailable: boolean
}

export function isDateUnavailable(
  availability: Record<string, DateAvailability[]>,
) {
  return (date: Date) => {
    const key = date.toISOString().split('T')[0]
    const slots = availability[key]
    return !slots || slots.every((slot) => !slot.isAvailable)
  }
}

interface ConstructDateWithTimeParams {
  day: Date | undefined
  time: Date | undefined
}

export function constructDateWithTime({
  day,
  time,
}: ConstructDateWithTimeParams) {
  if (!day || !time) return undefined
  return new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    time.getHours() || 0,
    time.getMinutes() || 0,
  )
}

interface FormatToISOLocalParams {
  dayOnly?: boolean
  timeOnly?: boolean
}

export function formatToISOLocal(
  date: Date | undefined,
  { dayOnly = false, timeOnly = false }: FormatToISOLocalParams = {},
) {
  if (!date) return ''

  if (dayOnly) {
    return format(date, 'yyyy-MM-dd')
  }
  if (timeOnly) {
    return format(date, 'HH:mm')
  }
  return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

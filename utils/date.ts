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
    return !slots || slots.some((slot) => slot.isAvailable)
  }
}

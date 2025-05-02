export function formatDate() {
  return new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

export function isDateUnavailable(
  availability: Record<string, { startTime: string; endTime: string }[]>,
) {
  const availableDates = new Set(Object.keys(availability))

  return (date: Date) => {
    const key = date.toISOString().split('T')[0]
    return !availableDates.has(key)
  }
}

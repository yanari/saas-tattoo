export function nameContains(search: string) {
  return {
    name: {
      contains: search,
      mode: 'insensitive' as const,
    },
  }
}

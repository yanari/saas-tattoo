export type Slot = { startTime: string; endTime: string; isAvailable: boolean }
export type RawAvailability = Record<string, Slot[]> | null | undefined

export function parseAvailability(
  availability: unknown,
): Record<string, Slot[]> {
  if (
    availability &&
    typeof availability === 'object' &&
    !Array.isArray(availability)
  ) {
    return availability as Record<string, Slot[]>
  }

  return {}
}

export interface DurationTime {
  startTime: Date
  endTime: Date
}

interface BaseBookingParams {
  serviceId: string
  serviceName: string
  servicePrice: number
  studioName: string
  date?: Date
  startTime?: Date
  endTime?: Date
}

interface GetBookingCallbackUrlParams extends BaseBookingParams {
  studioSlug: string
}

export function isBookingIncomplete(
  selectedDay?: Date,
  selectedDuration?: DurationTime,
): boolean {
  return !selectedDay || !selectedDuration
}

export function buildBookingParams(params: BaseBookingParams): string {
  const searchParams = new URLSearchParams({
    serviceId: params.serviceId,
    serviceName: params.serviceName,
    servicePrice: params.servicePrice.toString(),
    studioName: params.studioName,
    date: params.date?.toISOString() ?? '',
    startTime: params.startTime?.toISOString() ?? '',
    endTime: params.endTime?.toISOString() ?? '',
  })

  return searchParams.toString()
}

export function getBookingCallbackUrl({
  studioSlug,
  ...params
}: GetBookingCallbackUrlParams): string {
  const query = buildBookingParams(params)
  return `/studios/${studioSlug}/booking/redirect?${query}`
}

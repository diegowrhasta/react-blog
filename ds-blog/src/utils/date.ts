const shortDateOptions: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC'
}

const shortDateTimeFormatter = new Intl.DateTimeFormat(
  'en-GB',
  shortDateOptions
)

export function dateToShortString (date: Date): string {
  return shortDateTimeFormatter.format(date)
}

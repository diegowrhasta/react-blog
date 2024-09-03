import { EntryInterface } from '../data/entry.interface'

export function calculateRecentEntries (entries: EntryInterface[]) {
  const upperLimitCalculator = entries.length < 4 ? entries.length : 4
  return entries
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, upperLimitCalculator)
}

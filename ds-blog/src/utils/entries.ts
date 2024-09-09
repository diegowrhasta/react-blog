import { EntryInterface } from '../data/entry.interface'

const PAGINATOR_CONFIG: { pageSize: number } = {
  pageSize: 6
} as const

function calculateRecentEntries (entries: EntryInterface[]) {
  const upperLimitCalculator = entries.length < 4 ? entries.length : 4
  return entries
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, upperLimitCalculator)
}

function getPageNumber (entrySize: number) {
  return Math.ceil(entrySize / PAGINATOR_CONFIG.pageSize)
}

export { calculateRecentEntries, getPageNumber, PAGINATOR_CONFIG }

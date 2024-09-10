import { EntryInterface } from '../data/entry.interface'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    sortEntries(this: EntryInterface[]): EntryInterface[]
  }
}

Array.prototype.sortEntries = function sortEntries (this: EntryInterface[]) {
  return this.sort((a, b) => a.date.getTime() - b.date.getTime())
}

const PAGINATOR_CONFIG: { pageSize: number } = {
  pageSize: 6
} as const

function calculateRecentEntries (entries: EntryInterface[]) {
  const upperLimitCalculator = entries.length < 4 ? entries.length : 4
  return entries.slice(0, upperLimitCalculator)
}

function getPageNumber (entrySize: number) {
  return Math.ceil(entrySize / PAGINATOR_CONFIG.pageSize)
}

function getPageEntries (entries: EntryInterface[], pageNumber: number) {
  const baseIndex = (pageNumber - 1) * PAGINATOR_CONFIG.pageSize

  return entries.slice(
    baseIndex,
    baseIndex + PAGINATOR_CONFIG.pageSize
  )
}

export {
  PAGINATOR_CONFIG,
  calculateRecentEntries,
  getPageNumber,
  getPageEntries
}

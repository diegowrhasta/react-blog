import { DUMMY_ENTRY } from '../data'
import { EntryInterface } from '../data/entry.interface'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Array<T> {
    sortEntriesDesc(this: EntryInterface[]): EntryInterface[]
  }
}

Array.prototype.sortEntriesDesc = function sortEntries (this: EntryInterface[]) {
  return this.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const PAGINATOR_CONFIG: { pageSize: number } = {
  pageSize: 6
} as const

function calculateRecentEntries (entries: EntryInterface[]) {
  const upperLimitCalculator = entries.length < 4 ? entries.length : 4
  const slicedEntries = entries.slice(0, upperLimitCalculator)

  while (slicedEntries.length < 4) {
    slicedEntries.push(DUMMY_ENTRY)
  }

  return slicedEntries
}

function getPageNumber (entriesLength: number) {
  return Math.ceil(entriesLength / PAGINATOR_CONFIG.pageSize)
}

function getPageEntries (entries: EntryInterface[], pageNumber: number) {
  const baseIndex = (pageNumber - 1) * PAGINATOR_CONFIG.pageSize

  return entries.slice(baseIndex, baseIndex + PAGINATOR_CONFIG.pageSize)
}

function generateUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export {
  PAGINATOR_CONFIG,
  calculateRecentEntries,
  getPageNumber,
  getPageEntries,
  generateUUID
}

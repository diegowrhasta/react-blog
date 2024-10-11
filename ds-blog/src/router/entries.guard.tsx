import { useEffect } from 'react'
import { loadEntries } from '../services'
import { useAllEntriesStore } from '../store'

interface EntriesGuardProps {
  children: React.ReactNode
}

function EntriesGuard ({ children }: EntriesGuardProps) {
  const allEntries = useAllEntriesStore(state => state.allEntries)
  const updateAllEntries = useAllEntriesStore(state => state.updateAllEntries)

  useEffect(() => {
    if (allEntries.length !== 0) {
      return
    }

    loadEntries(updateAllEntries)
  }, [updateAllEntries, allEntries])

  return children
}

export { EntriesGuard }

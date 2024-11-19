import { create } from 'zustand'
import {
  type BlogDetailActionsInterface,
  type BlogDetailStateInterface
} from './types'

const initialState: BlogDetailStateInterface = {
  blogId: undefined,
  routing: false,
  detailLoading: false
} as const

const useBlogDetailStore = create<
  BlogDetailActionsInterface & BlogDetailStateInterface
>(set => {
  return {
    ...initialState,
    setEntryAsLoaded: () => {
      set({ routing: false })
    },
    triggerRouting: (blogId: string) => {
      set({ blogId: blogId, routing: true })
    },
    setDetailLoading: (isLoading: boolean) => {
      set({ detailLoading: isLoading })
    },
    reset: () => {
      set(initialState)
    }
  }
})

export { useBlogDetailStore }

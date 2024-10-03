import { create } from 'zustand'
import { type BlogDetailInterface } from './types'

const useBlogDetailStore = create<BlogDetailInterface>(set => {
  return {
    blogId: undefined,
    routing: false,
    detailLoading: false,
    setEntryAsLoaded: () => {
      set({ routing: false })
    },
    triggerRouting: (blogId: string) => {
      set({ blogId: blogId, routing: true })
    },
    setDetailLoading: (isLoading: boolean) => {
      set({ detailLoading: isLoading })
    }
  }
})

export { useBlogDetailStore }

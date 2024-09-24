import { create } from 'zustand'
import { type BlogDetailInterface } from './interfaces'

const useBlogDetailStore = create<BlogDetailInterface>(set => {
  return {
    blogId: undefined,
    routing: false,
    setEntryAsLoaded: () => {
      set({ routing: false })
    },
    triggerRouting: (blogId: string) => {
      set({ blogId: blogId, routing: true })
    }
  }
})

export { useBlogDetailStore }

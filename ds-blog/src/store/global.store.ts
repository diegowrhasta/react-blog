import { create } from 'zustand'
import { type GlobalInterface } from './interfaces'

const useGlobalStore = create<GlobalInterface>(set => {
  return {
    title: 'THE BLOG',
    scrollToBottom: false,
    setTitle: (newTitle: string) => {
      set({ title: newTitle })
    },
    setScrollToBottom: (scrollToBottom: boolean) => {
      set({ scrollToBottom })
    }
  }
})

export { useGlobalStore }

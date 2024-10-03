import { create } from 'zustand'
import { type GlobalInterface, type modeType } from './types'

const useGlobalStore = create<GlobalInterface>(set => {
  return {
    title: 'THE BLOG',
    scrollToBottom: false,
    mode: 'light',
    setTitle: (newTitle: string) => {
      set({ title: newTitle })
    },
    setScrollToBottom: (scrollToBottom: boolean) => {
      set({ scrollToBottom })
    },
    setMode: (newMode: modeType) => {
      set({ mode: newMode })
    }
  }
})

export { useGlobalStore }

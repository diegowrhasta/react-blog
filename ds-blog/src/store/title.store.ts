import { create } from 'zustand'
import { type TitleInterface } from './interfaces'

const useTitleStore = create<TitleInterface>(set => {
  return {
    title: 'THE BLOG',
    setTitle: (newTitle: string) => {
      set({ title: newTitle })
    }
  }
})

export { useTitleStore }

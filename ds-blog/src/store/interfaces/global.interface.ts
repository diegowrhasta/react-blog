export interface GlobalInterface {
  title: string | undefined
  scrollToBottom: boolean
  setTitle: (newTitle: string) => void
  setScrollToBottom: (scrollToBottom: boolean) => void
}

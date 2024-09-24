export interface BlogDetailInterface {
  blogId: string | undefined
  routing: boolean
  triggerRouting: (blogId: string) => void
  setEntryAsLoaded: () => void
}

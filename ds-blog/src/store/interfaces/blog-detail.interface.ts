export interface BlogDetailInterface {
  blogId: string | undefined
  routing: boolean
  detailLoading: boolean
  triggerRouting: (blogId: string) => void
  setEntryAsLoaded: () => void
  setDetailLoading: (isLoading: boolean) => void
}

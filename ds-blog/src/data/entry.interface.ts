export interface LabelInterface {
  label: string
  type: 'PURPLE' | 'BLUE' | 'RED'
}

export interface EntryInterface {
  id: string
  author: string
  date: Date
  title: string
  text: string
  previewText: string
  labels: Array<LabelInterface>
}

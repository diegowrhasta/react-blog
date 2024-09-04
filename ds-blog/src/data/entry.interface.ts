export interface LabelInterface {
  id: string
  label: string
  type: 'PURPLE' | 'BLUE' | 'RED' | 'GREEN'
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

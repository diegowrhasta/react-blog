import { EntryInterface, LabelInterface } from './entry.interface'

export const LABEL_ENTRIES: Record<string, LabelInterface> = {
  'label-1': {
    id: 'label-1',
    label: 'Design',
    type: 'PURPLE'
  },
  'label-2': {
    id: 'label-2',
    label: 'Research',
    type: 'BLUE'
  },
  'label-3': {
    id: 'label-3',
    label: 'Presentation',
    type: 'RED'
  },
  'label-4': {
    id: 'label-4',
    label: 'Philosophy',
    type: 'GREEN'
  }
}

export const ENTRY_DATA: Array<EntryInterface> = [
  {
    id: 'blog-1',
    author: 'Olivia Rhye',
    date: new Date('2023-01-01'),
    labels: [
      LABEL_ENTRIES['label-1'],
      LABEL_ENTRIES['label-2'],
      LABEL_ENTRIES['label-3'],
      LABEL_ENTRIES['label-4']
    ],
    previewText:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    title: 'UX review presentations'
  },
  {
    id: 'blog-2',
    author: 'Olivia Rhye',
    date: new Date('2023-01-01'),
    labels: [LABEL_ENTRIES['label-2']],
    previewText:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    title: 'UX review presentations'
  },
  {
    id: 'blog-3',
    author: 'Olivia Rhye',
    date: new Date('2023-01-01'),
    labels: [LABEL_ENTRIES['label-3']],
    previewText:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    title: 'UX review presentations'
  },
  {
    id: 'blog-4',
    author: 'Olivia Rhye',
    date: new Date('2023-01-01'),
    labels: [LABEL_ENTRIES['label-4']],
    previewText:
      'How do you create compelling presentations that wow your colleagues and impress your managers?',
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    title: 'UX review presentations'
  }
]

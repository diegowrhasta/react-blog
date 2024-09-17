import { faker } from '@faker-js/faker'

import { EntryInterface, LabelInterface } from './entry.interface'

const LABEL_ENTRIES: Record<string, LabelInterface> = {
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
} as const

const ENTRY_DATA: Array<EntryInterface> = [
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
] as const

let _mockData: EntryInterface[] | undefined = undefined

function getMockData () {
  if (!_mockData) {
    generateMockData()
  }

  return _mockData
}

function createRandomEntry (): EntryInterface {
  return {
    id: faker.string.uuid(),
    author: faker.person.fullName(),
    date: faker.date.recent(),
    labels: faker.helpers.arrayElements(Object.values(LABEL_ENTRIES)),
    previewText: faker.lorem.words(10),
    text: faker.lorem.paragraphs(3),
    title: faker.lorem.words(3)
  }
}

function generateMockData () {
  _mockData = []
  const randomLength = Math.floor(Math.random() * 15) + 5

  for (let i = 0; i < randomLength; i++) {
    _mockData.push(createRandomEntry())
  }

  _mockData[0] = {
    id: '70e2c51a-f70f-4df5-9cb8-bc4b88260888',
    author: 'Santos Dickens',
    date: new Date('2024-09-17T10:20:00'),
    labels: [
      LABEL_ENTRIES['label-2'],
      LABEL_ENTRIES['label-3'],
      LABEL_ENTRIES['label-4']
    ],
    previewText: 'RDR2 is the best',
    text: 'Coepi at degero comptus. Studio amissio volutabrum cavus cohaero decerno aeternus. Adicio quia subseco coepi doloribus perspiciatis corroboro vomito explicabo summisse.\nDepopulo suspendo articulus ipsa vigilo eos. Absconditus aedificium alienus. Virtus infit uredo.\nAstrum comminor theatrum teres subseco curiositas confugo. Tremo tristis tremo sophismata volubilis expedita suggero. Volubilis carpo voluptatem atrocitas tot.',
    title: 'Arthur Morgan'
  }
  console.log('MOCK DATA', _mockData)
}

function getBlogEntry (id: string) {
  return _mockData?.find(x => x.id === id)
}

export { getMockData, LABEL_ENTRIES, ENTRY_DATA, getBlogEntry }

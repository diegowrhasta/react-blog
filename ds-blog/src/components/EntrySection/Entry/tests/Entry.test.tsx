import { render, screen } from 'testing-library-utils'
import userEvent from '@testing-library/user-event'
import { Entry } from '../Entry'
import { createRandomEntry, DUMMY_ENTRY, EntryInterface } from 'src/data'
import { useBlogDetailStore } from 'src/store'

afterEach(() => {
  useBlogDetailStore.getState().reset()
})

test('entry is navigable and accesible', async () => {
  const user = userEvent.setup()
  const entryProps = createRandomEntry()
  render(<Entry {...entryProps} />)

  const entry = screen.getByRole('article', {
    name: new RegExp(entryProps.title, 'i')
  })
  expect(entry).toBeInTheDocument()

  await user.tab()
  expect(entry).toHaveFocus()

  await user.tab()
  expect(entry).not.toHaveFocus()

  await user.tab({ shift: true })
  expect(entry).toHaveFocus()

  await user.keyboard(' ')
  expect(useBlogDetailStore.getState().routing).toBeTruthy()

  useBlogDetailStore.getState().reset()
  await user.keyboard('{enter}')
  expect(useBlogDetailStore.getState().routing).toBeTruthy()

  useBlogDetailStore.getState().reset()
  await user.click(entry)
  expect(useBlogDetailStore.getState().routing).toBeTruthy()
})

test('skeleton entry is not focusable nor actionable', async () => {
  const user = userEvent.setup()
  const entryProps: EntryInterface = {
    ...createRandomEntry(),
    id: DUMMY_ENTRY.id
  }
  render(<Entry {...entryProps} />)

  const entry = screen.getByRole('article', {
    name: new RegExp(entryProps.title, 'i')
  })
  expect(entry).toBeInTheDocument()

  await user.tab()
  expect(entry).not.toHaveFocus()

  await user.tab()
  expect(entry).not.toHaveFocus()

  await user.tab({ shift: true })
  expect(entry).not.toHaveFocus()

  await user.click(entry)
  expect(useBlogDetailStore.getState().routing).toBeFalsy()
})

test('skeleton entry is short circuited', async () => {
  const user = userEvent.setup()
  const entryProps: EntryInterface = {
    ...createRandomEntry(),
    id: DUMMY_ENTRY.id,
    labels: undefined
  }
  render(<Entry {...entryProps} />)

  const entry = screen.getByRole('article', {
    name: new RegExp(entryProps.title, 'i')
  })
  expect(entry).toBeInTheDocument()

  await user.click(entry)
  expect(useBlogDetailStore.getState().routing).toBeFalsy()
})

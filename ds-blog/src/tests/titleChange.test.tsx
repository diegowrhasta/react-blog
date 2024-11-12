import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from '../App'

test('mode button click changes style', async () => {
  const user = userEvent.setup()
  render(<App />)

  const titleElement = screen.getByRole('heading', { name: /THE BLOG/i })
  expect(titleElement).toBeInTheDocument()

  const aboutLink = screen.getByRole('link', { name: /About/i })
  await user.click(aboutLink)
  expect(titleElement).toHaveTextContent('Diego B.')
})

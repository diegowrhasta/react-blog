import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { App } from '../App'

test('mode button click changes style', async () => {
  const user = userEvent.setup()
  render(<App />)

  const modeButton = screen.getByRole('button', { name: /Mode Button/i })
  expect(modeButton).toBeInTheDocument()
  expect(modeButton).toHaveClass('light')
  expect(document.body).not.toHaveClass('dark-theme')

  await user.click(modeButton)
  expect(modeButton).toBeInTheDocument()
  expect(modeButton).toHaveClass('dark')
  expect(document.body).toHaveClass('dark-theme')
})

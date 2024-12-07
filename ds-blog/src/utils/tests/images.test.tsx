import { render, screen } from '@testing-library/react'
import { useRef, useState } from 'react'
import userEvent from '@testing-library/user-event'
import { checkForImageLoading } from '../images'

const TestComponent = () => {
  const [isLoading, setIsLoading] = useState(true)
  const ref = useRef<HTMLDivElement>(null)

  function onClick () {
    checkForImageLoading(ref, setIsLoading)
  }

  return (
    <div ref={ref}>
      <img src='../' alt='dummy' />
      {isLoading && <span>Is Loading...</span>}
      <button onClick={onClick}>Trigger</button>
    </div>
  )
}

test('already lodaded images should trigger sync state update', async () => {
  const user = userEvent.setup()
  render(<TestComponent />)

  const loadingComponent = screen.getByText('Is Loading...')
  const button = screen.getByRole('button', { name: /Trigger/i })
  const images = screen.getAllByRole('img') as HTMLImageElement[]
  expect(loadingComponent).toBeInTheDocument()

  // Mock the image load behavior manually
  images.forEach(img => {
    // Mock the "complete" property of the image
    Object.defineProperty(img, 'complete', { value: true })
  })

  await user.click(button)

  expect(loadingComponent).not.toBeInTheDocument()
})

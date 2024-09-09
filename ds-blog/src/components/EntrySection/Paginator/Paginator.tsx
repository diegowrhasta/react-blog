import { Dispatch, SetStateAction, useState } from 'react'

import './Paginator.css'

const PAGE_DIRECTIONS = {
  previousPage: -1,
  nextPage: 1
}

interface PaginatorProps {
  pageNumber: number
  pageSize: number
}

function Paginator ({ pageNumber }: PaginatorProps) {
  const [selectedPage, setSelectedPage] = useState(1)

  return (
    <div className='paginator-container'>
      <span className='page-section previous-section'>
        <button
          onClick={() =>
            onPageChange(
              PAGE_DIRECTIONS.previousPage,
              selectedPage,
              pageNumber,
              setSelectedPage
            )
          }
        >
          <svg
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.8334 10.4998H4.16675M4.16675 10.4998L10.0001 16.3332M4.16675 10.4998L10.0001 4.6665'
              stroke='#667085'
              strokeWidth='1.67'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Previous</span>
        </button>
      </span>
      <span className='paginator-section'>
        {getButtonDistribution(pageNumber, selectedPage)}
      </span>
      <span className='page-section next-section'>
        <button
          onClick={() =>
            onPageChange(
              PAGE_DIRECTIONS.nextPage,
              selectedPage,
              pageNumber,
              setSelectedPage
            )
          }
        >
          <span>Next</span>
          <svg
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.8334 10.4998H4.16675M4.16675 10.4998L10.0001 16.3332M4.16675 10.4998L10.0001 4.6665'
              stroke='#667085'
              strokeWidth='1.67'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </span>
    </div>
  )
}

function getButtonDistribution (pageNumber: number, selectedPage: number) {
  const maxFullSize = 6
  const pageEntry: number[] = []
  if (pageNumber > maxFullSize) {
    for (let i = 1; i <= 3; i++) {
      pageEntry.push(i)
    }

    pageEntry.push(-1)

    for (let i = 1; i <= 3; i++) {
      pageEntry.push(pageNumber - i)
    }
  }

  for (let i = 1; i <= pageNumber; i++) {
    pageEntry.push(i)
  }

  return pageEntry.map((entry, index) => {
    return (
      <div
        key={`${index}-page`}
        className={`page-button ${selectedPage === entry ? 'selected' : ''}`}
      >
        {coalesceButtonText(entry)}
      </div>
    )
  })
}

function coalesceButtonText (number: number) {
  if (number === -1) {
    return '...'
  }

  return number
}

function onPageChange (
  direction: number,
  currentPage: number,
  pageNumber: number,
  updatePageFn: Dispatch<SetStateAction<number>>
) {
  let newPage = currentPage + direction

  if (newPage < 1) {
    newPage = 1
  }

  if (newPage > pageNumber) {
    newPage = pageNumber
  }

  updatePageFn(newPage)
}

export { Paginator }

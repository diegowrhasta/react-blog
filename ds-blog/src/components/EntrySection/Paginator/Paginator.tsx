import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import './Paginator.css'
import { useAllEntriesStore, useGlobalStore } from '../../../store'

const PAGE_DIRECTIONS = {
  previousPage: -1,
  nextPage: 1
} as const

interface PaginatorProps {
  pageNumber: number
}

function Paginator ({ pageNumber }: PaginatorProps) {
  const updateNewPageCalculation = useAllEntriesStore(
    state => state.updateNewPageCalculation
  )
  const setScrollToBottom = useGlobalStore(state => state.setScrollToBottom)
  const [selectedPage, setSelectedPage] = useState(1)

  useEffect(() => {
    updateNewPageCalculation(selectedPage)
  }, [selectedPage, updateNewPageCalculation])

  function getButtonDistribution (
    pageNumber: number,
    selectedPage: number,
    updatePageFn: Dispatch<SetStateAction<number>>,
    setScrollToBottom: (scrollToBottom: boolean) => void
  ) {
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
      const isCurrentPage = calculateIsSelectedPage(selectedPage, entry)
      const selectedStyle = isCurrentPage ? 'selected' : ''
      const ariaCurrent = isCurrentPage ? 'page' : undefined
      const buttonText = coalesceButtonText(entry)

      return (
        <button
          key={`${index}-page`}
          className={`page-button ${selectedStyle} ${calculateNavigableButton(
            entry
          )}`}
          onClick={() => onPageJump(entry, updatePageFn, setScrollToBottom)}
          aria-current={ariaCurrent}
          aria-label={`Go to page ${buttonText}`}
        >
          {buttonText}
        </button>
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
    updatePageFn: Dispatch<SetStateAction<number>>,
    setScrollToBottom: (scrollToBottom: boolean) => void
  ) {
    let newPage = currentPage + direction

    if (newPage < 1) {
      newPage = 1
    }

    if (newPage > pageNumber) {
      newPage = pageNumber
    }

    updatePageFn(newPage)
    setScrollToBottom(true)
  }

  function onPageJump (
    pageToJump: number,
    updatePageFn: Dispatch<SetStateAction<number>>,
    setScrollToBottom: (scrollToBottom: boolean) => void
  ) {
    if (pageToJump === -1) {
      return
    }

    updatePageFn(pageToJump)
    setScrollToBottom(true)
  }

  function calculateIsSelectedPage (selectedPage: number, entry: number) {
    return selectedPage === entry
  }

  function calculateNavigableButton (entry: number) {
    return entry === -1 ? 'no-click' : ''
  }

  return (
    <div
      role='navigation'
      aria-label='All Entries Pagination Controls'
      className='paginator-container'
    >
      <span className='page-section previous-section'>
        <button
          aria-label='Go to previous page'
          onClick={() =>
            onPageChange(
              PAGE_DIRECTIONS.previousPage,
              selectedPage,
              pageNumber,
              setSelectedPage,
              setScrollToBottom
            )
          }
        >
          <svg
            aria-hidden='true'
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.8334 10.4998H4.16675M4.16675 10.4998L10.0001 16.3332M4.16675 10.4998L10.0001 4.6665'
              strokeWidth='1.67'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <span>Previous</span>
        </button>
      </span>
      <span className='paginator-section'>
        {getButtonDistribution(
          pageNumber,
          selectedPage,
          setSelectedPage,
          setScrollToBottom
        )}
      </span>
      <span className='page-section next-section'>
        <button
          aria-label='Go to next page'
          onClick={() =>
            onPageChange(
              PAGE_DIRECTIONS.nextPage,
              selectedPage,
              pageNumber,
              setSelectedPage,
              setScrollToBottom
            )
          }
        >
          <span>Next</span>
          <svg
            aria-hidden='true'
            width='20'
            height='21'
            viewBox='0 0 20 21'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M15.8334 10.4998H4.16675M4.16675 10.4998L10.0001 16.3332M4.16675 10.4998L10.0001 4.6665'
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

export { Paginator }

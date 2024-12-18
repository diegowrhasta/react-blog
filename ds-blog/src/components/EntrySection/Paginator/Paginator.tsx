import { Dispatch, SetStateAction, useEffect, useState } from 'react'

import './Paginator.css'
import { useAllEntriesStore, useGlobalStore } from '../../../store'

const MAX_PAGE_NUMBER = 6

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
    const pageEntry: number[] = []

    if (pageNumber > MAX_PAGE_NUMBER) {
      calculateEllipsisDistribution(pageEntry, selectedPage, pageNumber)
    } else {
      for (let i = 1; i <= pageNumber; i++) {
        pageEntry.push(i)
      }
    }

    return pageEntry.map((entry, index) => {
      const isEllipsis = entry === -1
      const isCurrentPage = calculateIsSelectedPage(selectedPage, entry)
      const selectedStyle = isCurrentPage ? 'selected' : ''
      const ariaCurrent = isCurrentPage ? 'page' : undefined
      const buttonText = coalesceButtonText(isEllipsis, entry)
      const ariaLabel = isEllipsis
        ? 'Skipped pages, not clickable'
        : `Go to page ${buttonText}`

      return (
        <button
          disabled={isEllipsis}
          key={`${index}-page`}
          className={`page-button ${selectedStyle} ${calculateNavigableButton(
            entry
          )}`}
          onClick={() => onPageJump(entry, updatePageFn, setScrollToBottom)}
          aria-current={ariaCurrent}
          aria-label={ariaLabel}
        >
          {buttonText}
        </button>
      )
    })
  }

  function calculateEllipsisDistribution (
    pageEntry: number[],
    selectedPage: number,
    pageNumber: number
  ) {
    const initialRange = []

    if (selectedPage > 3 && selectedPage < pageNumber - 2) {
      initialRange.push(selectedPage - 2, selectedPage)
    } else {
      initialRange.push(1, 3)
    }

    for (let i = initialRange[0]; i <= initialRange[1]; i++) {
      pageEntry.push(i)
    }

    pageEntry.push(-1)

    for (let i = pageNumber - 2; i <= pageNumber; i++) {
      pageEntry.push(i)
    }
  }

  function coalesceButtonText (isEllipsis: boolean, text: number) {
    return isEllipsis ? '...' : text
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

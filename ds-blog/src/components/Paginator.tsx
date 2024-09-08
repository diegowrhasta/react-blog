import './Paginator.css'

function Paginator () {
  return (
    <div className='paginator-container'>
      <span className='page-section previous-section'>
        <button>
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
              stroke-width='1.67'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
          <span>Previous</span>
        </button>
      </span>
      <span className='paginator-section page-buttons'>BUTTONS</span>
      <span className='page-section next-section'>
        <button>
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
              stroke-width='1.67'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </svg>
        </button>
      </span>
    </div>
  )
}

export { Paginator }

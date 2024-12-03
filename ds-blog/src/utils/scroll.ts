const SCROLL_TIMEOUT = 50

let scrollTimeout: NodeJS.Timeout

function scrollToBottom () {
  console.log('hello????')
  window.scrollTo(0, document.body.scrollHeight)
}

function onContentUpdate () {
  console.log('ON CONTENT UPDATE')
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    scrollToBottom()
  }, SCROLL_TIMEOUT)
}

export { onContentUpdate }

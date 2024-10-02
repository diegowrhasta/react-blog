const SCROLL_TIMEOUT = 50

let scrollTimeout: number

function scrollToBottom () {
  window.scrollTo(0, document.body.scrollHeight)
}

function onContentUpdate () {
  scrollToBottom()
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    scrollToBottom()
  }, SCROLL_TIMEOUT)
}

export { onContentUpdate }
